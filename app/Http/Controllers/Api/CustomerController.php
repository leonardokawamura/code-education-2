<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Firebase\Auth as FirebaseAuth;
use App\Http\Requests\CustomerRequest;
use App\Http\Requests\PhoneNumberToUpdateRequest;
use App\Mail\PhoneNumberChangeMail;
use App\Models\User;
use App\Models\UserProfile;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

class CustomerController extends Controller
{
    public function store(CustomerRequest $request)
    {
        $data = $request->all();
        $token = $request->token;
        $data['phone_number'] = $this->getPhoneNumber($token);
        $data['photo'] = $data['photo'] ?? null;
        $user = User::createCustomer($data);
        return [
            'token' => Auth::guard('api')->login($user)
        ];
    }

    public function requestPhoneNumberUpdate(PhoneNumberToUpdateRequest $request) 
    {
        $user = User::whereEmail($request->email)->first();
        $phoneNumber = $this->getPhoneNumber($request->token);
        $token = UserProfile::createTokenToChangePhoneNumber($user->profile, $phoneNumber);
        Mail::to($user)->send(new PhoneNumberChangeMail($user, $token));
        return response()->json([], 204);
    }

    private function getPhoneNumber($token)
    {
        $firebaseAuth = app(FirebaseAuth::class);
        return $firebaseAuth->phoneNumber($token);
    }   
    
    
}
