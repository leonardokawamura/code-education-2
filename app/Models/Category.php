<?php

namespace App\Models;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Model;
use Mnabialek\LaravelEloquentFilter\Traits\Filterable;

class Category extends Model
{
    use Sluggable, Filterable;

    protected $fillable = ['name', 'active', 'slug'];

    public function sluggable()
    {
        return [
            'slug' => [
                'source' => 'name',
                'onUpdate' => true
            ]
        ];
    }

    public function products()
    {
        return $this->belongsToMany(Product::class);
    }
}
