<?php


namespace App\Controllers;


use App\Core\BaseController;
use App\Utilities;

class Logout extends BaseController
{
    public function index()
    {
        if (Utilities\Auth::isAuthenticated())
        {
            // TODO : destroy cookies
            Utilities\Redirect::to(URL_BASE_PUBLIC . '/home/index');
        }
        else
        {
            $this->view->render('login/index');
        }
    }
}