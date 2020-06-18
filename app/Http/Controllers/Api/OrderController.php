<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Filters\OrderFilter;
use App\Http\Resources\OrderResource;
use App\Models\Order;
use App\Rules\OrderPaymentLinkChange;
use App\Rules\OrderStatusChange;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index()
    {
        $filter = app(OrderFilter::class);
        $filterQuery = Order::with(['product', 'user'])->filtered($filter);
        $orders = $filterQuery->paginate();
        return OrderResource::collection($orders);
    }

    public function show(Order $order)
    {
        return new OrderResource($order);
    }

    public function update(Request $request, Order $order)
    {
        $this->validate($request, [
            'status' => [
                'nullable',
                'in:' . Order::STATUS_APPROVED . ',' . Order::STATUS_CANCELLED . ',' . Order::STATUS_SENT,
                new OrderStatusChange($order->status)
            ],
            'payment_link' => [
                'nullable',
                'url',
                new OrderPaymentLinkChange($order->status)
            ]
        ]); 
        
        $order->status = $request->get('status') ?? $order->status;
        $order->payment_link = $request->get('payment_link') ?? $order->payment_link;
        $order->obs = $request->get('obs') ?? $order->obs;
        $order->updateWithProduct();

        return new OrderResource($order);
    }
}
