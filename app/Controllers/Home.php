<?php

namespace App\Controllers;

use App\Core\BaseController;

class Home extends BaseController
{
    public function index()
    {
        $data['pageTitle'] = 'Home';
        $data['fromModel'] = $this->getModel('PageHome')->sayHello();

        $this->renderView('templates/header', $data);
        $this->renderView('home/index', $data);
        $this->renderView('templates/footer');
    }

    public function page()
    {
        echo 'hia';
    }
}
