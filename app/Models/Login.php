<?php


namespace App\Models;


use App\Core\BaseModel;

/**
 * Class Login
 * @package App\Models
 */
class Login extends BaseModel
{
    /**
     * @param $email
     * @param $password
     * @return array
     */
    public function loginGetUser($email, $password)
    {
        $dbResult = $this->db->execute(
            "SELECT id, username
                         FROM users
                         WHERE email = :email AND password = :password",
            [':email' => $email, ':password' => $password]
        );
        $dbResultFirst = $this->db->getQueryResult()[0];
        return array('id' => $dbResultFirst->id,
            'username' => $dbResultFirst->username);
    }

    /**
     * @param $userID
     * @param $username
     */
    public function insertNewCookies($userID, $username)
    {
        $this->db->execute(
            "INSERT INTO cookie (cookie_string, userid)
                         VALUES (:cookie_string, :userid)"
            , ['cookie_string' => $username, 'userid' => $userID]
        );
    }
}