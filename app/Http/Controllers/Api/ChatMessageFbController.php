<?php

namespace App\Http\Controllers\Api;

use App\Firebase\ChatMessageFb;
use App\Http\Requests\ChatMessageFbRequest;
use App\Http\Controllers\Controller;
use App\Models\ChatGroup;
use Illuminate\Support\Facades\Auth;

class ChatMessageFbController extends Controller
{
    public function store(ChatMessageFbRequest $request, ChatGroup $chat_group)
    {
        /* $firebaseUid = Auth::guard('api')->user()->profile->firebase_uid;
        $chatMessageFb = new ChatMessageFb();
        $chatMessageFb->create([
            'firebase_uid' => $firebaseUid,
            'chat_group' => $chat_group
        ] + $request->all()); */
        return response()->json([], 204);
    }
    

}
