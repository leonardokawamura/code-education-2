<?php

namespace App\Http\Filters;

use Mnabialek\LaravelEloquentFilter\Filters\SimpleQueryFilter;

class CategoryFilter extends SimpleQueryFilter
{
    /**
     * @var		array	$simpleFilters
     */
    protected $simpleFilters = ['id', 'name'];
    /**
     * @var		array	$simpleSorts
     */
    protected $simpleSorts = ['id', 'name', 'created_at'];
}