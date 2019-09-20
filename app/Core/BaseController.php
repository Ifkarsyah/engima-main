<?php

namespace App\Core;

class BaseController
{
    public function renderView($view, $data = [])
    {
        require_once '../app/Views/' . $view . '.php';
    }

    public function getModel($model)
    {
        require_once '../app/Models/' . $model . '.php';
        $classModel = 'App\Models\\' . $model;
        return new $classModel;
    }
}
