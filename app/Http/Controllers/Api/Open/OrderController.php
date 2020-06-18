<?php

namespace App\Http\Controllers\Api\Open;

use App\Http\Controllers\Controller;
use App\Http\Resources\Open\OrderResource as OpenOrderResource;
use App\Models\Order;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    public function index()
    {
        $userId = Auth::guard('api')->user()->id;
        $orders = Order::where('user_id', $userId)->paginate();
        return OpenOrderResource::collection($orders);
    }    

    public function show(Order $order)
    {
        $this->assertOrder($order);
        return new OpenOrderResource($order);
    }
    
    private function assertOrder($order)
    {
        if ($order->user_id !== Auth::guard('api')->user()->id) {
            abort(404);
        }
    }
    
}
