<?php


namespace App\Models;


use App\Core\BaseModel;

/**
 * Class User
 * Used in page: login, register
 * @package App\Models
 */
class User extends BaseModel
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

    public function deleteCookie($cookie_string)
    {
        $this->db->execute(
            "DELETE FROM cookie WHERE cookie_string = :cookieString",
            ['cookieString' => $cookie_string]
        );
    }

    /**
     * @param $cookie_string
     * @return mixed
     */
    public function getUserIDFromCookies($cookie_string){
        $dbResult = $this->db->execute(
            "SELECT userid 
                         FROM cookie 
                         WHERE cookie_string = :cookie_string",
            ['cookie_string' => $cookie_string]
        );
        return $dbResult->getQueryResult()[0]->userid;
    }

    /**
     * @param $userID
     * @return mixed
     */
    public function getUserNameByUserID($userID)
    {
        $dbResult = $this->db->execute(
            "SELECT username
                         FROM users
                         WHERE id = :userid",
            ['userid' => $userID]
        );
        return $dbResult->getQueryResult()[0]->username;
    }

    public function insertNewUser($username, $email, $phone, $password, $profilePic)
    {
        $targetFile = $this->uploadProfilePic($profilePic);

        $this->db->execute(
            "INSERT INTO 
                         users (username, email, phone, password, profile_pic) 
                         VALUES (:username, :email, :phone, :password, :profilePic)",
            [
                'username' => $username,
                'email' => $email,
                'phone' => $phone,
                'password' => $password,
                'profilePic' => $targetFile,
            ]
        );
    }

    private function uploadProfilePic($profilePic): string
    {

        $rows = $this->db->execute("SELECT COUNT(id) FROM users");
        $rows = $rows->getQueryResultCount();

        $oldFile = $profilePic['name'];
        $imageFileType = strtolower(pathinfo($oldFile,PATHINFO_EXTENSION));

        $dirUpload = URL_BASE_PUBLIC . 'img/profile/';
        $targetFile = $dirUpload . 'pic_' . (1 + $rows) . '.' . $imageFileType;

        move_uploaded_file($oldFile, $targetFile);

        return $targetFile;
    }
}