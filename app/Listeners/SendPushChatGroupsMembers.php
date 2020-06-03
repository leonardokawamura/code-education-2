<?php
declare(strict_types = 1);
namespace App\Listeners;

use App\Events\ChatMessageSent;
use App\Firebase\CloudMessagingFb;
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
        $tokens = $this->getTokens();
        
        if(!count($tokens)) {
            return;
        }

        $chatGroup = $this->event->getChatGroup();
        $from = $this->event->getFrom();

        /** @var CloudMessagingFb $messaging */
        $messaging = app(CloudMessagingFb::class);
        $messaging
            ->setTitle("{$from->name} enviou uma mensagem em {$chatGroup->name}")
            ->setBody($this->getBody())
            ->setTokens($tokens)
            ->setData([
                'chat_group_id' => $chatGroup->id
            ])
            ->send();            
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
    
    private function getBody()
    {
        switch($this->event->getMessageType()) {
            case 'text':
                return substr($this->event->getContent(), 0, 20);
            case 'audio':
                return 'Novo áudio';
            case 'image':
                return 'Nova imagem';
        }
    }   
    
}
