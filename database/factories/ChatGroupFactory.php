<?php

use Faker\Generator as Faker;

$factory->define(App\Models\ChatGroup::class, function (Faker $faker) {
    return [
        'name' => $faker->country
    ];
});
