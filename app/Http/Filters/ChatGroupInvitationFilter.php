<?php

namespace App\Http\Filters;

use Mnabialek\LaravelEloquentFilter\Filters\SimpleQueryFilter;

class ChatGroupInvitationFilter extends SimpleQueryFilter
{    
    /**
     * @var		array	$simpleSorts
     */
    protected $simpleSorts = ['id', 'total', 'remaining', 'expires_at'];    

    public function hasFilterParameter()
    {
        $contains = $this->parser->getFilters()->contains(function ($filter) {
            return $filter->getField() === 'search' && !empty($filter->getValue());
        });
        return $contains;
    }
    
}