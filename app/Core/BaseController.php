<?php

namespace App\Core;

use App\Utilities\Redirect;

class BaseController
{
    protected $view = null;
    protected $model = null;

    public function __construct()
    {
        $this->view = new BaseView();
    }

    public function useModel($model)
    {
        require_once '../app/Models/' . $model . '.php';
        $classModel = 'App\Models\\' . $model;
        return new $classModel;
    }

    public function getUserIDFromCookies()
    {
        if (!isset($_COOKIE[COOKIE_USER]))
        {
            Redirect::to(URL_BASE_PUBLIC . 'login');
            die();
        }
        $userID = $this->useModel('User')->getUserIDFromCookies($_COOKIE[COOKIE_USER]);
        if (isset($userID) && $userID > 0)
        {
            return $userID;
        }
        Redirect::to(URL_BASE_PUBLIC . 'login');
        die();
    }
}
