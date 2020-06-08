<?php

namespace App\Http\Controllers\Api;

use App\Exceptions\ChatInvitationUserException;
use App\Http\Controllers\Controller;
use App\Http\Resources\ChatInvitationUserCollection;
use App\Http\Resources\ChatInvitationUserResource;
use App\Models\ChatGroup;
use App\Models\ChatGroupInvitation;
use App\Models\ChatInvitationUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ChatInvitationUserController extends Controller
{
   public function index(ChatGroup $chat_group)
    {
        $userInvitations = $chat_group->userInvitations()->with('user')->paginate();
        return new ChatInvitationUserCollection($userInvitations, $chat_group);
    }
   
    public function show(ChatGroup $chat_group, ChatInvitationUser $invitation)
    {
        $this->assertInvitation($chat_group, $invitation);
        return new ChatInvitationUserResource($invitation);
    }

    public function store(ChatGroupInvitation $invitation_slug)
    {
        try {
            $invitationUser = ChatInvitationUser::createIfAllowed($invitation_slug, Auth::guard('api')->user());
            return new ChatInvitationUserResource($invitationUser);
        } catch (ChatInvitationUserException $e) {
            switch ($e->getCode()) {
                case ChatInvitationUserException::ERROR_NOT_INVITATION:
                case ChatInvitationUserException::ERROR_IS_MEMBER:                    
                case ChatInvitationUserException::ERROR_HAS_STORED:                    
                    return abort(403, $e->getMessage());
                case ChatInvitationUserException::ERROR_HAS_SELLER:
                    return abort(422, $e->getMessage());
            }
        }
    }
    
    public function update(Request $request, ChatGroup $chat_group, ChatInvitationUser $invitation)
    {
        $this->assertInvitation($chat_group, $invitation);
        if($invitation->status != ChatInvitationUser::STATUS_PENDING) {
            abort(403, 'Só é possível alterar convite com status pendente');
        }
        $this->validate($request, [
            'status' => 'required|in:' . ChatInvitationUser::STATUS_APPROVED . ',' . ChatInvitationUser::STATUS_REROVED
        ]);
        $invitation->status = $request->get('status');
        $invitation->save();
        return new ChatInvitationUserResource($invitation);
    }

    private function assertInvitation(ChatGroup $chatGroup, ChatInvitationUser $user)
    {
        if($user->invitation->group_id != $chatGroup->id) {
            abort(404);
        }
    }
    
    
}
