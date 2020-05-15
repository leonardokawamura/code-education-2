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
            case 'image':
                $this->upload($data['content']);
                /** @var UploadedFile $uploadedFile */
                $uploadedFile = $data['content'];
                $fileUrl = $this->groupFileDir() . '/' . $this->buildFileName($uploadedFile);
                $data['content'] = $fileUrl;            
        }

        $reference = $this->getMessageReferences();
        $newReference = $reference->push([
            'type' => $data['type'],
            'content' => $data['content'],
            'created_at' => ['.sv' => 'timestamp'],
            'user_id' => $data['firebase_uid']
        ]);
        $this->setLastMessage($newReference->getKey());
        $this->chatGroup->updateInFb();
    }

    private function upload(UploadedFile $file)
    {
        $file->storeAs($this->groupFileDir(), $this->buildFileName($file), ['disk' => 'public']);
    }

    private function buildFileName(UploadedFile $file)
    {
        switch($file->getMimeType()) {
            case 'audio/x-hx-aac-adts':
                return "{$file->hashName()}";
            default:
                return $file->hashName();    
        }
    }
    
    private function groupFileDir()
    {
        return ChatGroup::DIR_CHAT_GROUPS . '/' . $this->chatGroup->id . '/messages_files';
    }       

    public function deleteMessages(ChatGroup $chatGroup)
    {
        $this->chatGroup = $chatGroup;
        $this->getMessageReferences()->remove();
    }       
    
    private function setLastMessage($messageUid)
    {
        $path = "{$this->getChatGroupsMessagesReference()}/last_message_id";
        $reference = $this->getFirebaseDatabase()->getReference($path);
        $reference->set($messageUid);
    }    

    private function getMessageReferences()
    {
        $path = "{$this->getChatGroupsMessagesReference()}/messages";
        return $this->getFirebaseDatabase()->getReference($path);        
    }   
    
    private function getChatGroupsMessagesReference()
    {
        return "/chat_groups_messages/{$this->chatGroup->id}";
    }
    
}
