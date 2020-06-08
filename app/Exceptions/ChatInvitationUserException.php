<?php

namespace App\Exceptions;

use Exception;

class ChatInvitationUserException extends Exception
{
    const ERROR_NOT_INVITATION = 1;
    const ERROR_HAS_SELLER = 2;
}
