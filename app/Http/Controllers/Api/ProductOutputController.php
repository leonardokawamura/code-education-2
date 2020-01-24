<?php

namespace App\Http\Controllers\Api;

use App\Models\ProductOutput;
use App\Http\Resources\ProductOutputResource;
use App\Http\Controllers\Controller;
use App\Http\Requests\ProductOutputRequest;

class ProductOutputController extends Controller
{
    public function index()
    {
        $outputs = ProductOutput::with('product')->paginate();        
        return ProductOutputResource::collection($outputs);
    }

    public function store(ProductOutputRequest $request)
    {
        $output = ProductOutput::create($request->all());        
        return new ProductOutputResource($output);
    }

    public function show(ProductOutput $output)
    {
        return new ProductOutputResource($output);
    }
}
