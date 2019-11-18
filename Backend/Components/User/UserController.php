<?php

namespace Components\User;

use Components\User\UserService;
use Core\BaseController;
use Utilities\Redirect;


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

    public function login($requestBody)
    {
        list('email' => $email, 'password' => $password) = $requestBody;
        $user = $this->services->loginGetUser($email, $password);
    }

    public function register($requestBody)
    {
        $username = $_POST['username'];
        $email = $_POST['email'];
        $phone = $_POST['phone'];
        $password = $_POST['password'];
        $profilePic = $_FILES['profilePic'];
        echo $requestBody;
    }
}