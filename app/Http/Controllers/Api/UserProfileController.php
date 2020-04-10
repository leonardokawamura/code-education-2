<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;
use App\Firebase\Auth as FirebaseAuth;
use App\Http\Requests\UserProfileUpdateRequest;

class UserProfileController extends Controller
{
    public function update(UserProfileUpdateRequest $request)
    {
        $data = $request->all();
        if($request->has('token')) {
            $token = $request->token;
            $data['phone_number'] = $this->getPhoneNumber($token);
        }
        if($request->has('remove_photo')) {
            $data['photo'] = null;
        }
        $user = Auth::guard('api')->user();
        $user->updateWithProfile($data);
        return new UserResource($user);
    }

    private function getPhoneNumber($token)
    {
        $firebaseAuth = app(FirebaseAuth::class);
        return $firebaseAuth->phoneNumber($token);
    }
    
    
    
    
}
