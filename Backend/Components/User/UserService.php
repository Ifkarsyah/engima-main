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
//        $dbResult = $this->db->execute(
//            "SELECT id, username
//                         FROM users
//                         WHERE email = :email AND password = :password",
//            [':email' => $email, ':password' => $password]
//        );
//        return $this->db->getQueryResult()[0];
        return array(
            'id' => 1,
            'username' => 'Ifkarsyah',
            'profilePic' => 'https://picsum.photos/200'
        );
    }
}