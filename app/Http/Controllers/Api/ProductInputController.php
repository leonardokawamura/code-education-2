<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\ProductInputResource;
use App\Models\ProductInput;

class ProductInputController extends Controller
{
    public function index()
    {
        $inputs = ProductInput::with('product')->paginate();        
        return ProductInputResource::collection($inputs);
    }

    public function store(Request $request)
    {
        
    }

    public function show($id)
    {
        //
    }
}
