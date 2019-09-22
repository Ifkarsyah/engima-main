<?php

namespace App\Core;

class BaseController
{
    protected $view = null;
    protected $model = null;
    public static $userLoggedIn = null;

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
}
