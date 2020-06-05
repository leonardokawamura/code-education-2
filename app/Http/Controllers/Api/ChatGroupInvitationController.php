<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Filters\ChatGroupInvitationFilter;
use App\Http\Requests\ChatGroupInvitationCreateRequest;
use App\Http\Requests\ChatGroupInvitationUpdateRequest;
use App\Http\Resources\ChatGroupInvitationCollection;
use App\Http\Resources\ChatGroupInvitationResource;
use App\Models\ChatGroup;
use App\Models\ChatGroupInvitation;

class ChatGroupInvitationController extends Controller
{
    
    public function index(ChatGroup $chat_group)
    {
        $linkInvitations = $chat_group->linkInvitations()->paginate();        
        return new ChatGroupInvitationCollection($linkInvitations, $chat_group);
    }

    public function store(ChatGroupInvitationCreateRequest $request, ChatGroup $chat_group)
    {
        $chatGroup = ChatGroupInvitation::create($request->all() + ['group_id' => $chat_group->id]);
        return new ChatGroupInvitationResource($chatGroup);
    }

    public function show(ChatGroup $chat_group, ChatGroupInvitation $link_invitation)
    {
        $this->assertInvitation($chat_group, $link_invitation);
        return new ChatGroupInvitationResource($link_invitation);
    }

    public function update(ChatGroupInvitationUpdateRequest $request, ChatGroup $chat_group, ChatGroupInvitation $link_invitation)
    {
        $this->assertInvitation($chat_group, $link_invitation);
        $link_invitation
            ->fill($request->except('group_id'))
            ->save();
        return new ChatGroupInvitationResource($link_invitation);
    }

    public function destroy(ChatGroup $chat_group, ChatGroupInvitation $link_invitation)
    {
        $this->assertInvitation($chat_group, $link_invitation);
        $link_invitation->delete();
        return response()->json([], 204);
    }

    private function assertInvitation(ChatGroup $chatGroup, ChatGroupInvitation $link_invitation)
    {
        if($link_invitation->group_id != $chatGroup->id) {
            abort(404);
        }
    }
    
    
}
