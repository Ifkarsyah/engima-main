<?php


namespace App\Models;


use App\Core\BaseModel;

class User extends BaseModel
{
    // Used in : View Login
    public function isUserExists($username, $password)
    {
        return true;
    }

    // Used in : View Register
    public function isUsernameExists($username)
    {
        return false;
    }

    // Used in : View Register
    public function insertUserToDB($username, $email, $phone, $password, $profilePic)
    {
        return true;
    }

    // Used in : Utilities
    public function getUserByID($id = 0)
    {
        return array(
            'username' => 'tobey',
            'profilePic' => 'http://www.gstatic.com/tv/thumb/persons/74064/74064_v9_bb.jpg',
        );
    }
}