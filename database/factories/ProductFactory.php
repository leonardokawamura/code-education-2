<?php

use Faker\Generator as Faker;

$factory->define(App\Models\Product::class, function (Faker $faker) {
    return [
        'name' => $faker->colorName,
        'description' => $faker->text(200),
        'price' => $faker->randomFloat(2, 1, 10),
        'stock' => $faker->randomDigit
    ];
});
