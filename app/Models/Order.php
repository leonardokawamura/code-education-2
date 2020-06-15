<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    const STATUS_PENDING = 1;
    const STATUS_APPROVED = 2;
    const STATUS_CANCELED = 3;
    const STATUS_SENT = 4;

    protected $fillable = ['user_id', 'product_id', 'amount', 'price', 'total'];

    public function user()
    {
        /**
         * withTrashed para relacionar com registros deletados
         */
        return $this->belongsTo(User::class)->withTrashed(); 
    }

    public function product()
    {
        return $this->belongsTo(Product::class)->withTrashed();
    } 
    
}
