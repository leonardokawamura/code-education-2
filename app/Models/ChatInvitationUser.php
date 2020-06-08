<?php

namespace App\Models;

use App\Exceptions\ChatInvitationUserException;
use Illuminate\Database\Eloquent\Model;

class ChatInvitationUser extends Model
{
    const STATUS_PENDING = 1;
    const STATUS_APPROVED = 2;
    const STATUS_REROVED = 3;

    protected $fillable = ['invitation_id', 'user_id'];

    public static function createIfAllowed(ChatGroupInvitation $groupInvitation, User $user)
    {
        self::throwIfNotAllowed($groupInvitation, $user);        
        return self::create([
            'invitation_id' => $groupInvitation->id,
            'user_id' => $user->id
        ]);
    }

    private static function throwIfNotAllowed(ChatGroupInvitation $groupInvitation, User $user)
    {
        if(!$groupInvitation->hasInvitation()) {
            throw new ChatInvitationUserException('Ingresso no grupo não permitido', ChatInvitationUserException::ERROR_NOT_INVITATION);
        }
        if($user->role == User::ROLE_SELLER) {
            throw new ChatInvitationUserException('Vendedor não precisa ingressar em um grupo', ChatInvitationUserException::ERROR_HAS_SELLER);
        }
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
