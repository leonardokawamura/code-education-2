<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ChatInvitationUser extends Model
{
    const STATUS_PENDING = 1;
    const STATUS_APPROVED = 2;
    const STATUS_REROVED = 3;

    protected $fillable = ['invitation_id', 'user_id'];

    public function invitation()
    {
        return $this->belongsTo(ChatGroupInvitation::class, 'invitation_id');
    }
    
    public function user()
    {
        return $this->belongsTo(User::class);
    }   
    
}
