<?php

use App\Models\User;
use App\Models\UserProfile;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Seeder;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\File;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        File::deleteDirectory(UserProfile::photoPath(), true);

        factory(User::class, 1)
            ->create([
                'email' => 'admin@user.com'
            ])
            ->each(function ($user) {    
                Model::reguard();            
                $user->updateWithProfile([
                    'phone_number' => '+16505551234',
                    'photo' => $this->getAdminPhoto()
                ]);
                Model::unguard();
            });

        factory(User::class, 1)
            ->create([
                'email' => 'customer@user.com',
                'role' => User::ROLE_CUSTOMER
            ])
            ->each(function ($user) {
                Model::reguard();
                $user->updateWithProfile([
                    'phone_number' => '+16505551235'
                ]);
                Model::unguard();
            });

        factory(User::class, 20)
            ->create([
                'role' => User::ROLE_CUSTOMER   
            ]);  
    }    

    public function getAdminPhoto()
    {
        return new UploadedFile(storage_path('app/faker/users/pp.jpg'), str_random(16) . '.jpg');
    }
    
    
    
}