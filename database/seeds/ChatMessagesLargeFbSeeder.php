<?php

use App\Models\ChatGroup;
use Illuminate\Database\Seeder;

class ChatMessagesLargeFbSeeder extends ChatMessagesFbSeeder
{
    protected $numMessages = 100;

    protected function getChatGroups()
    {
        return ChatGroup::whereId(1)->get();
    }
}
