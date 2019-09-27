<?php


namespace App\Controllers;


use App\Core\BaseController;

/**
 * Class Booking
 * @package App\Controllers
 */
class Booking extends BaseController
{
    /**
     * @param $scheduleID
     */
    public function index($scheduleID)
    {
        // Step 1: Check If logged in
        $userID = $this->getUserIDFromCookies();

        // Step 2: Set data to view
        $this->view->data['pageTitle'] = 'Home';
        $this->view->data['userID'] = $userID;
        $this->view->data['seats'] = $this->useModel('Booking')->getAvailableSeatsByScheduleID($scheduleID);
        $this->view->data['bookInfo'] = $this->useModel('Booking')->getScheduleInfoByID($scheduleID);

        // Step 3: Render
        $this->view->addCSS('css/index.css');
        $this->view->addJS('js/index.js');
        $this->view->render('templates/header');
        $this->view->render('templates/navbar');
        $this->view->render('booking/index');
        $this->view->render('templates/footer');
    }
}