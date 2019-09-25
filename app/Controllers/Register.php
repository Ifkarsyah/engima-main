<?php


namespace App\Controllers;


use App\Core\BaseController;
use App\Utilities\Redirect;

class Register extends BaseController
{
    public function index()
    {
        // Step 1: Check if logged in
        $userID = $this->useModel('User')->getUserIDFromCookies($_COOKIE['user']);
        if ($userID > 0)
        {
            Redirect::to(URL_BASE_PUBLIC . 'home');
        }

        // Step 2: Provide necessary data
        $this->view->data['pageTitle'] = 'Register';

        // Step 3: Render
        $this->view->addCSS('css/login.css');
        $this->view->addJS('js/index.js');
        $this->view->render('templates/header');
        $this->view->render('register');
        $this->view->render('templates/footer');
    }

    public function proceed()
    {

    }
}