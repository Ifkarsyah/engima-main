<?php

namespace App\Controllers;

use App\Core\BaseController;
use App\Utilities\Auth;


class Home extends BaseController
{
    public function index()
    {
        // Step 1: Dependencies
        $this->view->addCSS('css/home.css');
        $this->view->addJS('js/index.js');
        $this->useModel('User');

        // Step 2: Add Data
        $this->view->data['pageTitle'] = 'Home';    // Step 2.1: Set pageTitle
        self::$userLoggedIn = Auth::getUserFromCookies(); // Step 2.2: Result = null | UserOne()

        // Step 3: Render
        $this->view->render('templates/header');
        $this->view->render('templates/navbar');
        $this->view->render('home/index');
        $this->view->render('templates/footer');
    }
}
