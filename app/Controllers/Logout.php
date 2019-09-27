<?php


namespace App\Controllers;


use App\Core\BaseController;
use App\Utilities\Redirect;

class Logout extends BaseController
{
    public function index()
    {
        if (!isset($_COOKIE[COOKIE_USER]))
        {
            Redirect::to(URL_BASE_PUBLIC . 'login');
            die();
        }
        $this->useModel('User')->deleteCookie($_COOKIE[COOKIE_USER]);
        unset($_COOKIE[COOKIE_USER]);
        setcookie(COOKIE_USER, null, time() - 3600, '/');
        Redirect::to(URL_BASE_PUBLIC . 'login');
    }
}