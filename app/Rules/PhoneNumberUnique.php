<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;
use App\Firebase\Auth as FirebaseAuth;
use App\Models\UserProfile;

class PhoneNumberUnique implements Rule
{
    private $ignoreUserId;

    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct($ignoreUserId = null)
    {
        $this->ignoreUserId = $ignoreUserId;
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        $firebaseAuth = app(FirebaseAuth::class);
        try {
            $phoneNumber = $firebaseAuth->phoneNumber($value);
            $profile = UserProfile::where('phone_number', $phoneNumber)->first();
            return $profile == null || $this->ignoreUserId != null && $this->ignoreUserId == $profile->user->id;
        } catch (\Exception $e) {
            return false;
        }
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'Phone number has used';
    }
}
