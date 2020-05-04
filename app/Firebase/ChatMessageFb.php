<?php

namespace App\Firebase;

use App\Models\ChatGroup;
use Illuminate\Http\UploadedFile;

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
                $this->upload($data['content']);
                /** @var UploadedFile $uploadedFile */
                $uploadedFile = $data['content'];
                $fileUrl = $this->groupFileDir() . '/' . $uploadedFile->hashName();
                $data['content'] = $fileUrl;            
        }
        
        $reference = $this->getMessageReferences();
        $reference->push([
            'type' => $data['type'],
            'content' => $data['content'],
            'created_at' => ['.sv' => 'timestamp'],
            'user_id' => $data['firebase_uid']
        ]);
    }

    private function upload(UploadedFile $file)
    {
        $file->store($this->groupFileDir(), ['disk' => 'public']);
    }
    
    private function groupFileDir()
    {
        return ChatGroup::DIR_CHAT_GROUPS . '/' . $this->chatGroup->id . 'messages_files';
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
