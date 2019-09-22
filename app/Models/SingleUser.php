<?php


namespace App\Models;


class SingleUser
{
    private $userID;
    private $username;
    private $email;
    private $phone;


    public function getUsername(): string
    {
        return $this->username;
    }

    public function getProfilePic(): string
    {
        return $this->profilePic;
    }

    private $password;
    private $profilePic;

    public function __construct($userID=0, $username='', $email='', $phone='', $password='', $profilePic='')
    {
        $this->userID = $userID;
        $this->username = 'Andre';
        $this->email = $email;
        $this->phone = $phone;
        $this->password = $password;
        $this->profilePic = 'https://haho.co.id/uploads/34/talent/1770/profile/Andre_Taulany-1.jpg';
    }
}