<?php


namespace App\Controllers;


use App\Core\BaseController;

/**
 * Class Register
 * @package App\Controllers
 */
class Register extends BaseController
{
    /**
     *
     */
    public function index()
    {
        // Step 1: Provide necessary data
        $this->view->data['pageTitle'] = 'Register';

        // Step 2: Render
        $this->view->addJS('js/index.js');
        $this->view->addCSS('css/register.css');
        $this->view->addJS('js/register.js');
        $this->view->render('templates/header');
        $this->view->render('register/index');
        $this->view->render('templates/footer');
    }

    /**
     *
     */
    public function proceed()
    {
        $username = $_POST['username'];
        $email = $_POST['email'];
        $phone = $_POST['phone'];
        $password = $_POST['password'];
        $profilePic = $_FILES['profilePic'];
        $this->useModel('Register')->insertNewUser($username, $email, $phone, $password, $profilePic);
    }

    /**
     * @param $username
     */
    public function isUsernameExists($username)
    {
        $exists = $this->useModel('Register')->isUsernameExists($username);
        http_response_code($exists ? 400 : 200);
    }
}