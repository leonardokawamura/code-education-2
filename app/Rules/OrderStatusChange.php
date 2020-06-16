<?php

namespace App\Rules;

use App\Models\Order;
use Illuminate\Contracts\Validation\Rule;

class OrderStatusChange implements Rule
{
    private $rulesChanges = [
        Order::STATUS_APPROVED => [Order::STATUS_SENT, Order::STATUS_CANCELLED],
        Order::STATUS_SENT => [Order::STATUS_CANCELLED],
        Order::STATUS_CANCELLED => [Order::STATUS_CANCELLED]
    ];

    private $oldStatus;

    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct($oldStatus)
    {
        $this->oldStatus = $oldStatus;
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        if(!array_key_exists($this->oldStatus, $this->rulesChanges)) { //PENDING
            return true;
        }

        if(!in_array($value, $this->rulesChanges[$this->oldStatus])) {
            return false;
        }

        return true;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'Status inválido. Com este valor é permitido alterar para: ' . (implode(', ', $this->rulesChanges[$this->oldStatus]));
    }
}
