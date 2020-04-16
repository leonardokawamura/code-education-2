<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ChatGroupCreateRequest;
use App\Http\Requests\ChatGroupUpdateRequest;
use App\Http\Resources\ChatGroupResource;
use App\Models\ChatGroup;

class ChatGroupController extends Controller
{   
    public function index()
    {
        $chat_groups = ChatGroup::paginate();
        return ChatGroupResource::collection($chat_groups);
    }
    
    public function store(ChatGroupCreateRequest $request)
    {
        $chat_group = ChatGroup::createWithPhoto($request->all());
        return new ChatGroupResource($chat_group);
    }

    public function show(ChatGroup $chat_group)
    {
        return new ChatGroupResource($chat_group);
    }

    public function update(ChatGroupUpdateRequest $request, ChatGroup $chat_group)
    {
        $chat_group->updateWithPhoto($request->all());
        return new ChatGroupResource($chat_group);
    }

    public function destroy(ChatGroup $chat_group)
    {
        $chat_group->delete();
        return response()->json([], 204);
    }
}
