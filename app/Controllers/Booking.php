<?php


namespace App\Controllers;


use App\Core\BaseController;
use App\Utilities;

class Booking extends BaseController
{
    public function index()
    {
        if (Utilities\Auth::isAuthenticated())
        {
            $this->view->render('booking/index');
        }
        else
        {
            Utilities\Redirect::to(URL_BASE_PUBLIC . '/login/index');
        }
    }
}