<?php

namespace App\Controllers;

use App\Core\BaseController;
use App\Utilities\Redirect;

class Login extends BaseController
{
    public function index()
    {
        if (isset($_COOKIE[COOKIE_USER]))
        {
            Redirect::to(URL_BASE_PUBLIC . 'home/index');
            die();
        }
        // Step 1: Add data
        $this->view->data['pageTitle'] = 'Login';

        // Step 2: Render
        $this->view->addCSS('css/login.css');
        $this->view->addJS('js/index.js');
        $this->view->render('templates/header');
        $this->view->render('login/index');
        $this->view->render('templates/footer');
    }

    public function proceed()
    {
        // Step 1: Get data from POST
        $email = $_POST['email'];
        $password = $_POST['password'];

        // Step 2: Check in Database
        $user = $this->useModel('User')->loginGetUser($email, $password);
        if ($user)
        {
            setcookie(COOKIE_USER, $user['username'], time() + 3600, '/');
            $this->useModel('User')->insertNewCookies($user['id'], $user['username']);
            Redirect::to(URL_BASE_PUBLIC . 'home/index');
        }
        else
        {
            Redirect::to(URL_BASE_PUBLIC . 'login/index');
        }
    }
}