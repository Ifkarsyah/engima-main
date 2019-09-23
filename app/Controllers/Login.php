<?php

namespace App\Controllers;

use App\Core\BaseController;
use App\Utilities\Auth;
use App\Utilities\Redirect;

class Login extends BaseController
{
    public function index()
    {
        // Step 1: Dependencies
        $this->view->addCSS('css/login.css');
//        $this->view->addJS('js/index.js');

        // Step 2: Add Data
        $this->view->data['pageTitle'] = 'Login';    // Step 2.1: Set pageTitle
        self::$userLoggedIn = Auth::getUserFromCookies(); // Step 2.2: Result = null | UserOne()

        // Step 3: Render
        $this->view->render('templates/header');
        $this->view->render('login/index');
        $this->view->render('templates/footer');
    }

    public function proceed()
    {
        // Step 1: Get data from POST
        $username = $_POST['username'];
        $password = $_POST['password'];

        // Step 2: Check in Database
        $result = $this->useModel('User')->isUserExists($username, $password);
        if ($result)
        {
            Redirect::to(URL_BASE_PUBLIC . 'home');
        }
        else
        {
            Redirect::to(URL_BASE_PUBLIC . 'login');
        }
    }
}