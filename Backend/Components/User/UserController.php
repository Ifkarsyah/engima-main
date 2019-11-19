<?php

namespace Components\User;

use Components\User\UserService;
use Core\BaseController;


/**
 * Class UserController
 * @package Components
 */
class UserController extends BaseController
{
    public function __construct()
    {
        parent::__construct();
        require_once 'UserService.php';
        $this->services = new UserService();
    }

    public function login(array $requestBody): void
    {
        list('email' => $email, 'password' => $password) = $requestBody;
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $this->response400();
        }
        $user = $this->services->loginGetUser($email, $password);
        if (empty($user)) {
            echo json_encode(array(
                'isUserExists' => false,
                'message' => 'username or password not in database'
            ));
        } else {
            echo json_encode(array(
                'isUserExists' => true,
                'user' => $user
            ));
        }
    }

    public function register(array $requestBody)
    {
        $username = $_POST['username'];
        $email = $_POST['email'];
        $phone = $_POST['phone'];
        $password = $_POST['password'];
        $profilePic = $_FILES['profilePic'];
        echo $requestBody;
    }
}