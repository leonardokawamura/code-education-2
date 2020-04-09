<?php

use App\Http\Controllers\Api\ProductController;
use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['namespace' => 'Api', 'as' => 'api.'], function() {
    Route::name('login')->post('login', 'AuthController@login');
    Route::name('login_vendor')->post('login_vendor', 'AuthController@loginFirebase');
    Route::name('logout')->post('logout', 'AuthController@logout')->middleware(['auth:api']);
    Route::name('refresh')->post('refresh', 'AuthController@refresh');

    Route::resource('customers', 'CustomerController', ['only' => ['store']]);
    Route::group(['middleware' => ['auth:api', 'jwt.refresh']], function () { 
        Route::patch('profile', 'UserProfileController@update');
        Route::group(['middleware' => ['can:is_seller']], function () {
            Route::name('me')->get('me', 'AuthController@me');
            Route::patch('products/{product}/restore', 'ProductController@restore');
            Route::resource('products', 'ProductController')->except(['create', 'edit']);
            Route::resource('categories', 'CategoryController')->except(['create', 'edit']);  
            Route::resource('products.categories', 'ProductCategoryController')->only(['index', 'store', 'destroy']);
            Route::resource('products.photos', 'ProductPhotoController')->except(['create', 'edit']);
            Route::resource('inputs', 'ProductInputController')->only(['index', 'store', 'show']);
            Route::resource('outputs', 'ProductOutputController')->only(['index', 'store', 'show']);
            Route::patch('users/{user}/restore', 'UserController@restore');
            Route::resource('users', 'UserController')->except(['create', 'edit']);
        });  
    });    
});

