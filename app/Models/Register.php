<?php


namespace App\Models;


use App\Core\BaseModel;

/**
 * Class Register
 * @package App\Models
 */
class Register extends BaseModel
{
    /**
     * @param $username
     * @param $email
     * @param $phone
     * @param $password
     * @param $profilePic
     */
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

    /**
     * @param $profilePic
     * @return string
     */
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