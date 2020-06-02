<?php

namespace App\Firebase;

use sngrl\PhpFirebaseCloudMessaging\Client;
use sngrl\PhpFirebaseCloudMessaging\Message;
use sngrl\PhpFirebaseCloudMessaging\Notification;
use sngrl\PhpFirebaseCloudMessaging\Recipient\Device;

class CloudMessagingFb
{
    public function send()
    {
        $client = new Client();
        $client->setApiKey(env('FB_SERVER_KEY'));
        $message = new Message();
        $message->addRecipient(new Device(''));
        $message->setNotification(new Notification('titulo', 'mensagem'));
        
        $client->send($message);
    }

}
