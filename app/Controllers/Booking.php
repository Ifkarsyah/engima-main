<?php


namespace App\Controllers;


use App\Core\BaseController;
use App\Models\SingleUser;
use App\Utilities\Auth;

class Booking extends BaseController
{
    public function index()
    {
        // Step 1: Dependencies
        $this->view->addCSS('css/index.css');
        $this->view->addJS('js/index.js');

        // Step 2: User logged in or logout logic
        $this->useModel('User');
        self::$userLoggedIn = new SingleUser(1, 'andre'); // Step 2.2: Result = null | UserOne()

        // Step 3: Get necessary data from detail page
        $scheduleID = (isset($_GET['scheduleID']) ? $_GET['scheduleID'] : 1);

        // Step 4: Set data to view
        $this->view->data['pageTitle'] = 'Home';
        $this->view->data['seats'] = $this->useModel('Booking')->getAvailableSeatsByScheduleID($scheduleID);
        $this->view->data['bookInfo'] = $this->useModel('Booking')->getScheduleInfoByID($scheduleID);
//        print_r($this->view->data);

        // Step 5: Render
        $this->view->render('templates/header');
        $this->view->render('templates/navbar');
        $this->view->render('booking/index');
        $this->view->render('templates/footer');
    }
}