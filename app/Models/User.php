<?php


namespace App\Models;


use App\Core\BaseModel;

class User extends BaseModel
{

    public function createCookie($username)
    {

    }

    public function isExists($username, $password)
    {
        // TODO: SELECT * FROM user_cookies WHERE username=?
        return false;
    }

    public function isCookieExists()
    {
        // TODO: SELECT * FROM user_cookies WHERE username=?
        return false;
    }

    public function setCookie($username)
    {

    }
}