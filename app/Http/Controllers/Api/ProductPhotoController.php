<?php

namespace App\Http\Controllers\Api;

use App\Models\Product;
use App\Models\ProductPhoto;
use App\Http\Controllers\Controller;
use App\Http\Requests\ProductPhotoRequest;
use App\Http\Resources\ProductPhotoCollection;
use App\Http\Resources\ProductPhotoResource;

class ProductPhotoController extends Controller
{
    public function index(Product $product)
    {
        return new ProductPhotoCollection($product->photos, $product);
    }
    
    public function store(ProductPhotoRequest $request, Product $product)
    {
        $photos = ProductPhoto::createWithPhotosFiles($product->id, $request->photos);
        return response()->json(new ProductPhotoCollection($photos, $product), 201);
    }

    public function show(Product $product, ProductPhoto $photo)
    {
        $this->assertProductPhoto($product, $photo);
        return new ProductPhotoResource($photo);
    }

    public function update(ProductPhotoRequest $request, Product $product, ProductPhoto $photo)
    {
        $this->assertProductPhoto($product, $photo);
        $photo = $photo->updateWithPhoto($request->photo);
        return new ProductPhotoResource($photo);
    }

    public function destroy(Product $product, ProductPhoto $photo)
    {
        $this->assertProductPhoto($product, $photo);
        $photo->deleteWithPhoto();
        return response()->json([], 204);
    }

    private function assertProductPhoto(Product $product, ProductPhoto $photo)
    {
        if ($product->id != $photo->product_id) {
            abort(404);            
        }
    }
}
