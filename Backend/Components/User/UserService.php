<?php


namespace Components\User;


use Core\BaseModel;

/**
 * Class UserController
 * @package Models
 */
class UserService extends BaseModel
{
    public function loginGetUser($email, $password)
    {
        $dbResult = $this->db->selectFirst(
            "SELECT id, username
                         FROM users
                         WHERE email = :email AND password = :password",
            [':email' => $email, ':password' => $password]
        );
        return $dbResult;
    }
}