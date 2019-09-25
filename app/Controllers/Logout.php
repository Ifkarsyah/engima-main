<?php


namespace App\Controllers;


use App\Core\BaseController;
use App\Utilities\Redirect;

class Logout extends BaseController
{
    public function index()
    {
        unset($_COOKIE['user_cookies']);
        Redirect::to(URL_BASE_PUBLIC . 'login');
    }
}