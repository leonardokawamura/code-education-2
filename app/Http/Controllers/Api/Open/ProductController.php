<?php

namespace App\Http\Controllers\Api\Open;

use App\Http\Controllers\Controller;
use App\Http\Filters\Open\ProductFilter as OpenProductFilter;
use App\Http\Resources\Open\ProductResource as OpenProductResource;
use App\Models\Product;

class ProductController extends Controller
{
    public function index()
    {
        $filter = app(OpenProductFilter::class);
        $filterQuery = Product::filtered($filter);
        $products = $filterQuery->where('active', true)->where('stock', '>', 0)->paginate();
        return OpenProductResource::collection($products);
    }    
    
}
