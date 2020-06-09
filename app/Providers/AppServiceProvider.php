<?php

namespace App\Providers;

use App\Firebase\NotificationType;
use App\Models\ChatGroupInvitation;
use App\Models\ChatInvitationUser;
use App\Models\ProductInput;
use App\Models\ProductOutput;
use Illuminate\Support\ServiceProvider;
use Kreait\Firebase;
use Kreait\Firebase\Factory;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        ProductInput::created(function($input) {
            $product = $input->product;            
            $product->stock += $input->amount;
            $product->save();
        });

        ProductOutput::created(function($input) {
            $product = $input->product;            
            $product->stock -= $input->amount;
            if ($product->stock < 0) {
                throw new \Exception("Estoque de {$product->name} não pode ser negativo");
            }
            $product->save();
        });

        ChatGroupInvitation::creating(function ($invitation) {
            $invitation->slug = str_random(7);
            $invitation->remaining = $invitation->total;
        });

        ChatGroupInvitation::updating(function (ChatGroupInvitation $invitation) {
            $oldRemaining = $invitation->getOriginal('remaining');
            $newRemaining = $invitation->remaining;
            if($oldRemaining == $newRemaining) {
                $invitation->remaining = $invitation->total;
            }
        });

        ChatInvitationUser::created(function ($userInvitation) {
            $linkInvitation = $userInvitation->invitation;
            $linkInvitation->remaining -= 1;
            $linkInvitation->save();
        });

        ChatInvitationUser::updated(function ($userInvitation) {
            if($userInvitation->status == ChatInvitationUser::STATUS_PENDING) {
                return;
            }
            if($userInvitation->status == ChatInvitationUser::STATUS_REROVED) {
                $linkInvitation = $userInvitation->invitation;
                $linkInvitation->remaining += 1;
                $linkInvitation->save();
            }
            $group = $userInvitation->invitation->group;
            $userId = $userInvitation->user->id;
            $group->users()->attach($userId);

            $token = $userInvitation->user->profile->device_token;
            if(!$token) {
                return;
            }
            /** @var CloudMessagingFb $messaging */
            $messaging = app(CloudMessagingFb::class);
            $messaging
                ->setTitle("Sua inscrição foi aprovada")
                ->setBody('Você está inscrito em um novo grupo')
                ->setTokens([$token])
                ->setData([
                    'type' => NotificationType::CHAT_GROUP_SUBSCRIBE,
                    'chat_group_name' => $group->name
                ])
                ->send(); 
        });
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(Firebase::class, function() {
            $serviceAccount = Firebase\ServiceAccount::fromJsonFile(base_path('firebase-admin.json'));
            return (new Factory())->withServiceAccount($serviceAccount)->create();
        });
    }
}
