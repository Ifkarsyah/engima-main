<?php


namespace App\Controllers;


use App\Core\BaseController;

/**
 * Class Search
 * @package App\Controllers
 */
class Search extends BaseController
{
    /**
     * @param $pageNumber
     */
    public function index($pageNumber)
    {
        $this->getUserIDFromCookies();

        $querySearch = 'captain';

        $this->view->data['pageTitle'] = 'Search';
        $this->view->data['movies'] = $this->useModel('Search')->searchMovies($querySearch, $pageNumber);
        print_r($this->view->data);

        $this->view->addCSS('css/index.css');
        $this->view->addCSS('css/search.css');
        $this->view->render('templates/header');
        $this->view->render('templates/navbar');
        $this->view->render('search/index');
        $this->view->render('templates/footer');
    }
}