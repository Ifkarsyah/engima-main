<?php

namespace App\Controllers;

use App\Core\BaseController;

class Home extends BaseController
{
    public function index()
    {
        $data['pageTitle'] = 'Home';
        $data['fromModel'] = $this->getModel('Movie')->sayHello();

        $this->view->render('templates/header', $data);
        $this->view->render('home/index', $data);
        $this->view->render('templates/footer');
    }
}
