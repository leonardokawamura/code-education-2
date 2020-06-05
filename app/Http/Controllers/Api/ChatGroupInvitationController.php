<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ChatGroupInvitationCollection;
use App\Http\Resources\ChatGroupInvitationResource;
use App\Models\ChatGroup;
use App\Models\ChatGroupInvitation;
use ChatGroupInvitationsTableSeeder;
use Illuminate\Http\Request;

class ChatGroupInvitationController extends Controller
{
    
    public function index(ChatGroup $chat_group)
    {
        $linkInvitations = $chat_group->linkInvitations()->paginate();
        return new ChatGroupInvitationCollection($linkInvitations, $chat_group);
    }

    public function store(Request $request)
    {
        //
    }

    public function show(ChatGroup $chat_group, ChatGroupInvitation $link_invitation)
    {
        $this->assertInvitation($chat_group, $link_invitation);
        return new ChatGroupInvitationResource($link_invitation);
    }

    public function update(Request $request, ChatGroupInvitation $chatGroupInvitation)
    {
        //
    }

    public function destroy(ChatGroupInvitation $chatGroupInvitation)
    {
        //
    }

    private function assertInvitation(ChatGroup $chatGroup, ChatGroupInvitation $link_invitation)
    {
        if($link_invitation->group_id != $chatGroup->id) {
            abort(404);
        }
    }
    
    
}
