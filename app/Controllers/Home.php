<?php

namespace App\Controllers;

use App\Core\BaseController;


/**
 * Class Home
 * @package App\Controllers
 */
class Home extends BaseController
{
    /**
     *
     */
    public function index()
    {
        // Step 1: Check If logged in
        $userID = $this->getUserIDFromCookies();

        // Step 2: Add Page Title
        $this->view->data['pageTitle'] = 'Home';    // Step 2.1: Set pageTitle
        $this->view->data['username'] = $this->useModel('User')->getUsernameByUserID($userID);
        $this->view->data['movie'] = array(1 => 'dataMovie1', 2 => 'dataMovie2');

        // Step 3: Render
        $this->view->addCSS('css/home.css');
        $this->view->addJS('js/index.js');
        $this->view->render('templates/header');
        $this->view->render('templates/navbar');
        $this->view->render('home/index');
        $this->view->render('templates/footer');
    }
}
