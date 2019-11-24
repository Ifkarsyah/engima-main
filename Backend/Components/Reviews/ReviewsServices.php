<?php


namespace Models;


use Core\BaseModel;

/**
 * Class TransactionsController
 * @package Models
 */
class ReviewsServices extends BaseModel
{
    public function deleteReview($transactionID)
    {
        $this->db->execute(
            "DELETE FROM reviews WHERE transaction_id = :transactionID",
            ['transactionID' => $transactionID]
        );
    }

    public function addReview($transactionId, $userId, $movieId, $rating, $comment)
    {
        $this->db->insert("
                INSERT INTO reviews (transaction_id, movie_id, rating, comment) 
                VALUES (:transactionId, :movieId, :rating, :comment) 
            ", ['transactionId' => $transactionId, 'movieId' => $movieId, 'rating' => $rating, 'comment' => $comment]);
    }
}