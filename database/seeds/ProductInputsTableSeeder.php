<?php

use App\Models\Product;
use App\Models\ProductInput;
use Illuminate\Database\Seeder;

class ProductInputsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $products = Product::all();
        factory(ProductInput::class, 150)
            ->make()
            ->each(function($input) use($products) {
                $product = $products->random();
                $input->product_id = $product->id;
                $input->save();             
            });
    }
}
