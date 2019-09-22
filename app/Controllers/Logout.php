<?php


namespace App\Controllers;


use App\Core\BaseController;
use App\Utilities\Redirect;

class Logout extends BaseController
{
    public function index()
    {
        // Step 1: Destroy Cookies
        unset($_COOKIE['user_cookies']);
        BaseController::$userLoggedIn = null;

        // Step 2: Redirect Home non-login
        Redirect::to(URL_BASE_PUBLIC . 'login');
    }
}