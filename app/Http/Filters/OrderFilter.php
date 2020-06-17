<?php

namespace App\Http\Filters;

use Mnabialek\LaravelEloquentFilter\Filters\SimpleQueryFilter;

class OrderFilter extends SimpleQueryFilter
{
    /**
     * @var		array	$simpleFilters
     */
    protected $simpleFilters = ['search'];
    /**
     * @var		array	$simpleSorts
     */
    protected $simpleSorts = ['id', 'total', 'created_at', 'user', 'product'];

    protected function applySearch($value)
    {
        $this->query
            ->where('users.name', 'LIKE', "%$value%")
            ->orWhere('products.name', 'LIKE', "%$value%");
    }

    protected function applySortUser($order)
    {
        $this->query->orderBy('users.name', $order);
    }

    protected function applySortProduct($order)
    {
        $this->query->orderBy('produccts.name', $order);
    } 

    public function apply($query)
    {
        $query = $query->select('orders.*')
            ->join('products', 'products.id', '=', 'orders.product_id')
            ->join('users', 'users.id', '=', 'orders.user_id');
        
        return parent::apply($query);
    }

    public function hasFilterParemeter() {
        $contains = $this->parser->getFilters()->contains(function($filter) {
            return $filter->getField() === 'search' && !empty($filter->getValue());
        });
        return $contains;
    }
}