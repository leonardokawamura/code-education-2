<?php

namespace App\Firebase;

use sngrl\PhpFirebaseCloudMessaging\Client;
use sngrl\PhpFirebaseCloudMessaging\Message;
use sngrl\PhpFirebaseCloudMessaging\Notification;
use sngrl\PhpFirebaseCloudMessaging\Recipient\Device;

class CloudMessagingFb
{
    private $title;
    private $body;
    private $tokens;
    private $data = [];

    public function send()
    {
        $client = new Client();
        $client->setApiKey(env('FB_SERVER_KEY'));
        $message = new Message();

        foreach ($this->tokens as $token) {
            $message->addRecipient(new Device($token));
        }

        $message
            ->setNotification(new Notification($this->title, $this->body))
            ->setData($this->data);
        
        $client->send($message);
    }

    public function setTitle($title): CloudMessagingFb
    {
        $this->title = $title;
        return $this;
    }

    public function setBody($body): CloudMessagingFb
    {
        $this->body = $body;
        return $this;
    }

    public function setTokens(array $tokens): CloudMessagingFb
    {
        $this->tokens = $tokens;
        return $this;
    }
    
    public function setData(array $data): CloudMessagingFb
    {
        $this->data = $data;
        return $this;
    }   

}
