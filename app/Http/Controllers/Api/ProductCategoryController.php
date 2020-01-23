<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProductCategoryRequest;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;

class ProductCategoryController extends Controller
{
    public function index(Product $product)
    {
        return $product->categories;
    }
    
    public function store(ProductCategoryRequest $request, Product $product)
    {
        $changed = $product->categories()->sync($request->categories);
        $categoriesAttachedId = $changed['attached'];
        $categories = Category::whereIn('id', $categoriesAttachedId)->get();
        return $categories->count() ? response()->json($categories, 201) : [];
    }    

    public function destroy($id)
    {
        //
    }
}
