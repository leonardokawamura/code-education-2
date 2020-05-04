<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class ChatMessageFbRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return $this->groupHasUser() || $this->hasSeller();
    }

    private function groupHasUser()
    {
        $chatGroup = $this->route('chat_group');
        $user = Auth::guard('api')->user();
        return $chatGroup->users()->where('user_id', $user->id)->exists();
    }
    
    private function hasSeller()
    {
        $user = Auth::guard('api')->user();
        return $user->role == User::ROLE_SELLER;
    }
    
    

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            //
        ];
    }
}
