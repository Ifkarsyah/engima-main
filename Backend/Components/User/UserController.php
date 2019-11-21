<?php

namespace Components\User;

use Components\User\UserService;
use Core\BaseController;
use \Firebase\JWT\JWT;

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
            $payload = array(
                "sub" => $user['id'],
                "username" => $user['username'],
                "exp" => time() + 3600,
            );
            $token = JWT::encode($payload, ENGIMA_TOKEN_SECRET);
            echo json_encode(array(
                'isUserExists' => true,
                'token' => $token
            ));
        }
    }

    public function register(array $requestBody)
    {
        echo $requestBody;
    }

    public function getUsername($token)
    {
        if (!isset($token))
        {
            http_response_code(400);
            exit();
        }
        $decoded = JWT::decode($token, ENGIMA_TOKEN_SECRET, array('HS256'));
        http_response_code(200);
        echo json_encode(array(
           'username' => $decoded->username
        ));
    }
}