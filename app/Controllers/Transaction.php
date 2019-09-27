<?php


namespace App\Controllers;


use App\Core\BaseController;

/**
 * Class Transaction
 * @package App\Controllers
 */
class Transaction extends BaseController
{
    /**
     *
     */
    public function index()
    {
        $userID = $this->getUserIDFromCookies();

        $this->view->data['pageTitle'] = 'Search';
        $this->view->data['movies'] = $this->useModel('Transaction')->getTransactionHistory($userID);

        print_r($this->view->data);
        $this->view->addCSS('css/index.css');
        $this->view->addCSS('css/search.css');
        $this->view->render('templates/header');
        $this->view->render('templates/navbar');
        $this->view->render('search/index');
        $this->view->render('templates/footer');
    }

    public function deleteReview($transactionID)
    {
        $this->getUserIDFromCookies();
        $this->useModel('Transaction')->deleteReview($transactionID);
    }
}