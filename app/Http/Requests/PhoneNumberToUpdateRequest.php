<?php

namespace App\Http\Requests;

use App\Rules\FirebaseTokenVerification;
use App\Rules\PhoneNumberUnique;
use Illuminate\Foundation\Http\FormRequest;

class PhoneNumberToUpdateRequest extends FormRequest
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
        return [
            'email' => 'required|email|exists:users,email',
            'token' => [
                new FirebaseTokenVerification(),
                new PhoneNumberUnique()
            ]
        ];
    }
}
