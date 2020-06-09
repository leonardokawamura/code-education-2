<?php

namespace App\Http\Controllers\Api;

use App\Common\OnlyTrashed;
use App\Http\Controllers\Controller;
use App\Http\Filters\ProductFilter;
use App\Http\Requests\ProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{    
    use OnlyTrashed;

    public function index(Request $request)
    {
        $query = Product::query();
        $query = $this->onlyTrashedIfRequested($request, $query);
        //$products = $query->paginate(5);        

        /** @var ProductFilter $filter */        
        $filter = app(ProductFilter::class);

        /** @var Builder $filterQuery */
        //$filterQuery = Product::filtered($filter);
        $filterQuery = $query->filtered($filter);
       
        $products = $filter->hasFilterParemeter() ? $filterQuery->get() : $filterQuery->paginate(5);

        return ProductResource::collection($products);
    }

    public function store(ProductRequest $request)
    {
        $product = Product::createWithPhoto($request->all());
        $product->refresh();
        return new ProductResource($product);
    }

    public function show(Product $product)
    {
        return new ProductResource($product);
    }

    public function update(ProductRequest $request, Product $product)
    {
        $product->updateWithPhoto($request->all());
        $product->save();
        return new ProductResource($product);
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return response()->json([], 204);
    }

    public function restore(Product $product)
    {
        $product->restore();
        return response()->json([], 204);
    }
}