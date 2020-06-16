<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Filters\OrderFilter;
use App\Http\Resources\OrderResource;
use App\Models\Order;
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
            'status' => 'nullable|in:' . Order::STATUS_APPROVED . ',' . Order::STATUS_CANCELLED . ',' . Order::STATUS_SENT
        ]); 
    }
}
