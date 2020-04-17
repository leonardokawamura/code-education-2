<?php
declare(strict_types = 1);
namespace App\Firebase;

use Kreait\Firebase;
use Kreait\Firebase\Database\Reference;

trait FirebaseSync
{
    public static function bootFirebaseSync()
    {
        static::created(function() {

        });

        static::updated(function() {

        });

        static::deleted(function() {

        });
    }

    protected function getModelReference(): Reference
    {
        $path = $this->getTable() . '/' . $this->getKey();
        return $this->getFirebaseDatabase()->getReference($path);
    }

    protected function getFirebaseDatabase(): Firebase\Database
    {
        $firebase = app(Firebase::class);
        return $firebase->getDatabase();
    }
    
}
