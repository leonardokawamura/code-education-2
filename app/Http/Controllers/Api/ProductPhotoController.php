<?php

namespace App\Http\Controllers\Api;

use App\Models\Product;
use App\Models\ProductPhoto;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\ProductPhotoCollection;
use App\Http\Resources\ProductPhotoResource;

class ProductPhotoController extends Controller
{
    public function index(Product $product)
    {
        return ProductPhotoCollection::collection($product);
    }
    
    public function store(Request $request)
    {
        //
    }

    public function show(Product $product, ProductPhoto $photo)
    {
        if ($photo->product_id != $product->id) {
            abort(404);            
        }
        return $photo;
    }

    public function update(Request $request, ProductPhoto $productPhoto)
    {
        //
    }

    public function destroy(ProductPhoto $productPhoto)
    {
        //
    }
}
