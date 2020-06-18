<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $userId = $this->user->id;
        return [
            'name' => 'min:4|max:255',
            'email' => 'email|max:255|unique:users,email,' . $userId,
            'password' => 'min:4|max:16'
        ];
    }
}
