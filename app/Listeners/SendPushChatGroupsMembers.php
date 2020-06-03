<?php
declare(strict_types = 1);
namespace App\Listeners;

use App\Events\ChatMessageSent;

class SendPushChatGroupsMembers
{
    /** @var ChatMessageSent */
    private $event;

    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  ChatMessageSent  $event
     * @return void
     */
    public function handle(ChatMessageSent $event)
    {
        $this->event = $event;
    }

    private function getTokens(): array
    {
        $membersTokens = $this->getMembersTokens();
        $sellersTokens = $this->getSellersTokens();
        return array_merge($membersTokens, $sellersTokens);
    }

    private function getMembersTokens(): array
    {
        $chatGroup = $this->event->getChatGroup();
        $from = $this->event->getFrom();

        /** @var Collection $users */
        $users = $chatGroup
            ->users()
            ->whereHas('profile', function($query) use($from) {
                $query
                    ->whereNotNull('device_token')
                    ->whereNotIn('id', [$from->profile->id]);
            })->get();

        /** @var \Illuminate\Support\Collection $membersTokensCollection */
        $membersTokensCollection = $users->map(function ($user) {
            return $user->profile->device_token;
        });
        
        return $membersTokensCollection->toArray();
    }

    private function getSellersTokens(): array
    {
        return array();
    }
    
    
    
    
}
