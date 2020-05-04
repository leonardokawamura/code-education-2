<?php

namespace App\Firebase;

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

    private function getMessageReferences()
    {
        $path = "/chat_groups/{$this->chatGroup->id}/messages";
        return $this->getFirebaseDatabase()->getReference($path);        
    }
    
    
    
    
}
