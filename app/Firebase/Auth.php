<?php
declare(strict_types=1);

namespace App\Firebase;

use Kreait\Firebase;
use Kreait\Firebase\Auth\UserRecord;

class Auth 
{
    /**
     * @var Firebase
     */
    private $firebase;

    /**
     * Auth constructor
     */
    public function __construct(Firebase $firebase)
    {
        $this->firebase = $firebase;
    }

    public function user($token): UserRecord 
    {
        $verifiedIdtoken = $this->firebase->getAuth()->verifyIdtoken($token);
        $uid = $verifiedIdtoken->getClaim('sub');
        return $this->firebase->getAuth()->getUser($uid);
    }

    public function phoneNumber($token): string 
    {
        $user = $this->user($token);
        return $user->phoneNumber;
    }
}