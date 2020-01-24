<?php

use Faker\Generator as Faker;

$factory->define(App\Models\ProductInput::class, function (Faker $faker) {
    return [
        'amount' => $faker->numberBetween(10, 20)
    ];
});
