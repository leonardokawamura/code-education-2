<?php

namespace App\Http\Controllers\Api\Open;

use App\Http\Controllers\Controller;
use App\Http\Filters\Open\ProductFilter as OpenProductFilter;
use App\Http\Resources\Open\ProductPhotoCollection as OpenProductPhotoCollection;
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

    public function show(Product $product)
    {
        $product = Product::where('active', true)
            ->where('stock', '>', 0 )
            ->where('id', $product->id)
            ->firstOrFail();

        return new OpenProductPhotoCollection($product->photos, $product);    
    }
    
    
    
}
