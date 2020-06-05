<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ChatGroupInvitationUpdateRequest extends FormRequest
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
        $invitation = $this->route('link_invitation');
        return [
            'total' => 'required|integer|min:' . $invitation->remaining,
            'expires_at' => 'nullable|date|after_or_equal:today'
        ];
    }
}
