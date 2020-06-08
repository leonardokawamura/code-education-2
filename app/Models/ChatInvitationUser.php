<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ChatInvitationUser extends Model
{
    const STATUS_PENDING = 1;
    const STATUS_APPROVED = 2;
    const STATUS_REROVED = 3;

    protected $fillable = ['invitation_id', 'user_id'];

    public static function createIfAllowed(ChatGroupInvitation $groupInvitation, User $user)
    {
        return self::create([
            'invitation_id' => $groupInvitation,
            'user_id' => $user->id
        ]);
    }

    public function invitation()
    {
        return $this->belongsTo(ChatGroupInvitation::class, 'invitation_id');
    }
    
    public function user()
    {
        return $this->belongsTo(User::class);
    }   
    
}
