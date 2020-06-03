<?php
declare(strict_types = 1);
namespace App\Listeners;

use App\Events\ChatMessageSent;
use App\Models\User;
use App\Models\UserProfile;

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
        $this->getTokens();
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
        $from = $this->event->getFrom();
        $sellersTokensCollection = UserProfile::whereNotNull('device_token')
            ->whereNotIn('id', [$from->profile->id])
            ->whereHas('user', function ($query) {
                $query->where('role', User::ROLE_SELLER);
            })
            ->get()
            ->pluck('device_token');

        return $sellersTokensCollection->toArray();
    }
    
    
    
    
}
