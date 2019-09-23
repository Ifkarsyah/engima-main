<?php


namespace App\Controllers;


use App\Core\BaseController;
use App\Utilities\Auth;

class Register extends BaseController
{
    public function index()
    {
        // Step 1: Dependencies
        $this->view->addCSS('css/register.css');
//        $this->view->addJS('js/index.js');

        // Step 2: Add Data
        $this->view->data['pageTitle'] = 'Register';    // Step 2.1: Set pageTitle
        self::$userLoggedIn = Auth::getUserFromCookies(); // Step 2.2: Result = null | UserOne()

        // Step 3: Render
        $this->view->render('templates/header');
        $this->view->render('register/index');
        $this->view->render('templates/footer');
    }
}