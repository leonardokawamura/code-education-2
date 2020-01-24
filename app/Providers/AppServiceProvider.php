<?php

namespace App\Providers;

use App\Models\ProductInput;
use App\Models\ProductOutput;
use Exception;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        ProductInput::created(function($input) {
            $product = $input->product;            
            $product->stock += $input->amount;
            $product->save();
        });

        ProductOutput::created(function($input) {
            $product = $input->product;            
            $product->stock -= $input->amount;
            if ($product->stock < 0) {
                throw new \Exception("Estoque de {$product->name} não pode ser negativo");
            }
            $product->save();
        });
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
