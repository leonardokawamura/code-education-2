<?php

namespace App\Observers;

use App\Models\Order;

class OrderObserver
{
    public function created(Order $order)
    {
    
    }

    public function updated(Order $order)
    {
        $this->handleIfPending($order);
        $this->handleIfCancel($order);
        $this->handleIfApproved($order);
        $this->handleIfSent($order);
    }
    
    public function handleIfPending(Order $order)
    {
        if($order->status != Order::STATUS_PENDING) {
            return;
        }
    }
    
    public function handleIfCancel(Order $order)
    {
        if($order->status != Order::STATUS_CANCELLED) {
            return;
        }
    }

    public function handleIfApproved(Order $order)
    {
        if($order->status != Order::STATUS_APPROVED) {
            return;
        }
    }

    public function handleIfSent(Order $order)
    {
        if($order->status != Order::STATUS_SENT) {
            return;
        }
    }
}
