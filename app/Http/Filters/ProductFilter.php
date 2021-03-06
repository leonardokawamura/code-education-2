<?php

namespace App\Http\Filters;

use Mnabialek\LaravelEloquentFilter\Filters\SimpleQueryFilter;

class ProductFilter extends SimpleQueryFilter
{
    /**
     * @var		array	$simpleFilters
     */
    protected $simpleFilters = ['search'];
    /**
     * @var		array	$simpleSorts
     */
    protected $simpleSorts = ['id', 'name', 'price', 'created_at'];

    protected function applySearch($value)
    {
        $this->query
            ->where('name', 'LIKE', "%$value%")
            ->orWhere('description', 'LIKE', "%$value%");
    } 

    public function hasFilterParemeter() {
        $contains = $this->parser->getFilters()->contains(function($filter) {
            return $filter->getField() === 'search' && !empty($filter->getValue());
        });
        return $contains;
    }
}