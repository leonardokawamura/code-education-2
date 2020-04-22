<?php

namespace App\Http\Filters;

use Mnabialek\LaravelEloquentFilter\Filters\SimpleQueryFilter;
use App\Models\User;

class UserFilter extends SimpleQueryFilter
{
    /**
     * @var		array	$simpleFilters
     */
    protected $simpleFilters = ['search', 'role'];
    /**
     * @var		array	$simpleSorts
     */
    protected $simpleSorts = ['id', 'name', 'email', 'created_at'];

    protected function applySearch($value)
    {
        $this->query->where('name', 'LIKE', "%$value%")
            ->orWhere('email', 'LIKE', "%$value%");
    } 

    protected function applyRole($value)
    {
        $role = $value == 'customer' ? User::ROLE_CUSTOMER : User::ROLE_SELLER;
        $this->query->where('role', $role);
    }

    public function hasFilterParameter()
    {
        $contains = $this->parser->getFilters()->contains(function ($filter) {
            return $filter->getField() === 'search' && !empty($filter->getValue());
        });
        return $contains;
    }
    
    
    
    
}