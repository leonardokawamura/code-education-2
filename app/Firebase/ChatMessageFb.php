<?php

namespace App\Firebase;

class ChatMessageFb
{
    use FirebaseSync;

    public function create(array $data)
    {
        $type = $data['type'];

        switch ($type) {
            case 'audio':
                # code...
                break;
            case 'image':
                # code...
                break;
            case 'text':
                # code...
                break;
        }

    }
    
    
}
