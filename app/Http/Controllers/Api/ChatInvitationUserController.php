<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ChatGroupInvitation;
use App\Models\ChatInvitationUser;
use Illuminate\Http\Request;

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
