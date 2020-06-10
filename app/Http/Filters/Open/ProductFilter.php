<?php

namespace App\Http\Filters\Open;

use Mnabialek\LaravelEloquentFilter\Filters\SimpleQueryFilter;

class ProductFilter extends SimpleQueryFilter
{
    /**
     * @var		array	$simpleFilters
     */
    protected $simpleFilters = ['search', 'categories'];
    /**
     * @var		array	$simpleSorts
     */
    protected $simpleSorts = ['name', 'price', 'created_at'];

    protected function applySearch($value)
    {
        $this->query
            ->where('name', 'LIKE', "%$value%")
            ->orWhere('description', 'LIKE', "%$value%");
    } 

    protected function applyCategories($value)
    {
        if(!is_array($value) || count($value) <= 0) {
            return;
        }

        $this->query->whereHas('categories', function($query) use($value) {
            $query->whereIn('id', $value)->where('active', true);
        });
    }
    
    
}