<?php


namespace Components\Reviews;


use Core\BaseController;
use Models\ReviewsServices;

class ReviewsController extends BaseController
{
    public function __construct()
    {
        parent::__construct();
        require_once 'ReviewsServices.php';
        $this->services = new ReviewsServices();
    }

    public function addReview($transactionId, $userId, $movieId, $rating, $comment)
    {
        $this->services->addReview($transactionId, $userId, $movieId, $rating, $comment);
    }

    public function deleteReview($transactionId)
    {
        $this->services->deleteReview($transactionId);
    }
}