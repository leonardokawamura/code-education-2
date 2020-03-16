<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Filters\CategoryFilter;
use App\Http\Requests\CategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index(Request $request)
    {
        /** @var CategoryFilter $filter */        
        $filter = app(CategoryFilter::class);

        /** @var Builder $filterQuery */
        $filterQuery = Category::filtered($filter);
       
        $categories = $request->has('all') ? $filterQuery->get() : $filterQuery->paginate(5);
        
        return CategoryResource::collection($categories);
    }
    
    public function store(CategoryRequest $request)
    {       
        $category = Category::create($request->all());
        $category->refresh();
        return new CategoryResource($category);
    }

    public function show(Category $category)
    {
        return new CategoryResource($category);
    }
    
    public function update(CategoryRequest $request, Category $category)
    {
        $category->fill($request->all());
        $category->save();
        return new CategoryResource($category);
    }

    public function destroy(Category $category)
    {
        $category->delete();
        return response()->json([], 204);
    }
}
