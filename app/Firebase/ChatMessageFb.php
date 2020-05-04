<?php

namespace App\Firebase;

use App\Models\ChatGroup;

class ChatMessageFb
{
    use FirebaseSync;

    public function create(array $data)
    {
        $this->chatGroup = $data['chat_group'];
        $type = $data['type'];

        switch ($type) {
            case 'audio':
                # code...
                break;
            case 'image':
                # code...
                break;
        }
        $reference = $this->getMessageReferences();
        $reference->push([
            'type' => $data['type'],
            'content' => $data['content'],
            'created_at' => ['.sv' => 'timestamp'],
            'user_id' => $data['firebase_uid']
        ]);
    }

    public function deleteMessage(ChatGroup $chatGroup)
    {
        $this->chatGroup = $chatGroup;
        $this->getMessageReferences()->remove();
    }
    
    

    private function getMessageReferences()
    {
        $path = "/chat_groups/{$this->chatGroup->id}/messages";
        return $this->getFirebaseDatabase()->getReference($path);        
    }
    
    
    
    
}
