<?php

namespace App\Http\Controllers\Api;

use App\Exceptions\ChatInvitationUserException;
use App\Http\Controllers\Controller;
use App\Models\ChatGroupInvitation;
use App\Models\ChatInvitationUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ChatInvitationUserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }
    
    public function create()
    {
        //
    }
   
    public function store(ChatGroupInvitation $invitation_slug)
    {
        try {
            $invitationUser = ChatInvitationUser::createIfAllowed($invitation_slug, Auth::guard('api')->user());
            return $invitationUser;
        } catch (ChatInvitationUserException $e) {
            switch ($e->getCode()) {
                case ChatInvitationUserException::ERROR_NOT_INVITATION:
                    return abort(403, $e->getMessage());
                case ChatInvitationUserException::ERROR_HAS_SELLER:
                    return abort(422, $e->getMessage());
            }
        }
    }

    public function show(ChatInvitationUser $chatInvitationUser)
    {
        //
    }

    public function edit(ChatInvitationUser $chatInvitationUser)
    {
        //
    }

    public function update(Request $request, ChatInvitationUser $chatInvitationUser)
    {
        //
    }

    public function destroy(ChatInvitationUser $chatInvitationUser)
    {
        //
    }
}
