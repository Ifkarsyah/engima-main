<?php


namespace Components\Reviews;


use Core\BaseController;
use Firebase\JWT\JWT;
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
        http_response_code(200);
        echo json_encode(array('message' => 'success'));
    }

    public function deleteReview($transactionId)
    {
        $this->services->deleteReview($transactionId);
        http_response_code(200);
        echo json_encode(array('message' => 'success'));
    }

    public function isExistsReview($transactionId)
    {
        $review = $this->services->isExistsReview($transactionId);
        if (empty($review)) {
            http_response_code(200);
            echo json_encode(array(
                'status' => false
            ));
            exit();
        } else {
            http_response_code(200);
            echo json_encode(array(
                'status' => true
            ));
            exit();
        }
    }
}