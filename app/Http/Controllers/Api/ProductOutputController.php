<?php

namespace App\Http\Controllers\Api;

use App\Models\ProductOutput;
use App\Http\Resources\ProductOutputResource;
use App\Http\Controllers\Controller;
use App\Http\Filters\ProductOutputFilter;
use App\Http\Requests\ProductOutputRequest;

class ProductOutputController extends Controller
{
    public function index()
    {
        $filter = app(ProductOutputFilter::class);
        $filterQuery = ProductOutput::with('product')->filtered($filter);
        $outputs = $filterQuery->paginate(5);        
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
