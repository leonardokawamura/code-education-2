<?php
declare(strict_types = 1);
namespace App\Events;

use App\Models\ChatGroup;
use App\Models\User;

class ChatMessageSent
{
    private $chatGroup;
    private $messageType;
    private $content;
    private $from;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(ChatGroup $chatGroup, $messageType, $content, User $from)
    {
        $this->chatGroup = $chatGroup;
        $this->messageType = $messageType;
        $this->content = $content;
        $this->from = $from;
    }

    public function getChatGroup(): ChatGroup
    {
        return $this->chatGroup;
    }

    public function getMessageType()
    {
        return $this->messageType;
    }

    public function getContent()
    {
        return $this->content;
    }
    
    public function getFrom(): User
    {
        return $this->from;
    }
    
    
    
    
    
    
    
}
