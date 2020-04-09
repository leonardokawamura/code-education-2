<?php
declare(strict_types = 1);
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class UserProfile extends Model
{
    
    const BASE_PATH = 'app/public';
    const DIR_USERS = 'users';
    const DIR_USER_PHOTO = self::DIR_USERS . '/photos';
    const USER_PHOTO_PATH = self::BASE_PATH . '/' . self::DIR_USER_PHOTO;

    protected $fillable = ['photo', 'phone_number'];

    public static function saveProfile(User $user, array $data): UserProfile
    {
        if(array_key_exists('photo', $data)) {
            self::deletePhoto($user->profile);
            $data['photo'] = UserProfile::getPhotoHashName($data['photo']);
        }        
        $user->profile->fill($data)->save();
        return $user->profile;
    }
    
    private static function getPhotoHashName(UploadedFile $photo = null)
    {
        return $photo ? $photo->hashName() : null;
    }
    
    private static function deletePhoto(UserProfile $profile)
    {
        if(!$profile->photo) {
            return;
        }
        $dir = self::photoDir();
        Storage::disk('public')->delete("{$dir}/{$profile->photo}");
    }
    
    

    public static function photoPath()
    {
        $path = self::USER_PHOTO_PATH;        
        return storage_path($path);
    }

    public static function uploadPhoto(UploadedFile $photo = null) 
    {
        if(!$photo) {
            return;
        }
        $dir = self::photoDir();
        $photo->store($dir, ['disk' => 'public']);
    }

    public static function deleteFile($photo = null)
    {
        if(!$photo) {
            return;
        }
        $path = self::photoPath();
        $photoPath = "{$path}/{$photo->hashName()}";
        if(file_exists($photoPath)) {
            File::delete($photoPath);
        }
    }

    public static function photoDir()
    {
        $dir = self::DIR_USER_PHOTO;
        return $dir;
    }  

    public function getPhotoUrlAttribute()
    {
        $path = self::photoDir();
        return $this->photo ? asset("storage/{$path}/{$this->photo}") : 'https://www.gravatar.com/avatar/nouser.jpg';
    }
    
    public function user()
    {
        return $this->belongsTo(User::class);
    }    
    
}
