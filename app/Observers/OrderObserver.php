<?php

namespace App\Observers;

use App\Firebase\CloudMessagingFb;
use App\Firebase\NotificationType;
use App\Mail\OrderCreated;
use App\Models\Order;
use Illuminate\Support\Facades\Mail;

class OrderObserver
{
    public function created(Order $order)
    {
        if (! $this->runningInTerminal()) {
            $user = $order->user;
            Mail::to($user)->send(new OrderCreated($order));
        }
    }

    public function updated(Order $order)
    {
        $this->handleIfPending($order);
        $this->handleIfApproved($order);
        $this->handleIfCancel($order);
        $this->handleIfSent($order);
    }
    
    public function handleIfPending(Order $order)
    {
        if($order->status != Order::STATUS_PENDING) {
            return;
        }

        $token = $order->user->profile->device_token;

        if (! $token || $this->runningInTerminal()) {
            return;
        }

        $oldPaymentLink = $order->getOriginal('payment_link');

        if ($order->payment_link && $order->payment_link != $oldPaymentLink) {
            $messaging = app(CloudMessagingFb::class);
            $messaging->setTitle('Link de pagamento do pedido')
                ->setBody('Acesse o app para pagar o pedido')
                ->setTokens([$token])
                ->setData([
                    'type' => NotificationType::ORDER_DO_PAYMENT,
                    'order' => $order->id
                ])
                ->send();
        }
        
    }

    public function handleIfApproved(Order $order)
    {
        if($order->status != Order::STATUS_APPROVED) {
            return;
        }

        $token = $order->user->profile->device_token;

        if (! $token || $this->runningInTerminal()) {
            return;
        }

        $oldStatus = $order->getOriginal('status');

        if ($oldStatus !== $order->status) {
            $messaging = app(CloudMessagingFb::class);
            $messaging->setTitle('Seu pedido foi aprovado')
                ->setBody("Em breve o produto {$order->product->name} será enviado")
                ->setTokens([$token])
                ->setData([
                    'type' => NotificationType::ORDER_APPROVED,
                    'order' => $order->id
                ])
                ->send();
        }       
    }        
    
    public function handleIfCancel(Order $order)
    {
        if($order->status != Order::STATUS_CANCELLED) {
            return;
        }

        $oldStatus = $order->getOriginal('status');

        if ($oldStatus == Order::STATUS_SENT) {
            $product = $order->product()->lockForUpdate()->first();
            $product->increaseStock($order->amount);
        }

    }

    public function handleIfSent(Order $order)
    {
        if($order->status != Order::STATUS_SENT) {
            return;
        }
        
        $oldStatus = $order->getOriginal('status');

        if ($oldStatus !== $order->status) {
            $product = $order->product()->lockForUpdate()->first();
            $product->decreaseStock($order->amount);

            $token = $order->user->profile->device_token;

            if (! $token || $this->runningInTerminal()) {
                return;
            }

            $messaging = app(CloudMessagingFb::class);
            $messaging->setTitle("Seu produto {$order->product->name} foi enviado")
                ->setBody("Em breve o produto chegará nas suas mãos!")
                ->setTokens([$token])
                ->setData([
                    'type' => NotificationType::ORDER_SENT,
                    'order' => $order->id
                ])
                ->send();
        }   
    }

    private function runningInTerminal()
    {
        return app()->runningInConsole() || app()->runningUnitTests();
    }
}
