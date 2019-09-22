<?php


namespace App\Utilities;

use App\Models\SingleUser;

class Auth
{
    public static function getUserFromCookies()
    {
        if (2 === 2)
        {
            return new SingleUser();
        }
        else
        {
            return null;
        }
    }
}