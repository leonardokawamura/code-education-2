<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ChatGroupUserRequest;
use App\Http\Resources\ChatGroupUserResource;
use App\Models\ChatGroup;
use App\Models\User;

class ChatGroupUserController extends Controller
{
    public function index(ChatGroup $chat_group)
    {
        return new ChatGroupUserResource($chat_group);
    }

    public function store(ChatGroupUserRequest $request, ChatGroup $chat_group)
    {
        $chat_group->users()->attach($request->users);
        /** @var Collection $users */
        $users = User::whereIn('id', $request->users)->get();
        return response()->json(new ChatGroupUserResource($chat_group, $users), 201);
    }

    public function destroy(ChatGroup $chat_group, User $user)
    {
        $chat_group->users()->detach($user->id);
        return response()->json([], 204);
    }
}
