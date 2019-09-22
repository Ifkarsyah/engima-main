<?php

namespace App\Core;

class BaseController
{
    protected $view = null;

    public function __construct()
    {
        $this->view = new BaseView();
    }

    public function getModel($model)
    {
        require_once '../app/Models/' . $model . '.php';
        $classModel = 'App\Models\\' . $model;
        return new $classModel;
    }
}
