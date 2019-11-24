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
                INSERT INTO reviews (transaction_id, userId, movie_id, rating, comment) 
                VALUES (:transactionId, :userId, :movieId, :rating, :comment) 
            ", ['transactionId' => $transactionId, 'userId' => $userId, 'movieId' => $movieId, 'rating' => $rating, 'comment' => $comment]);

    }

    public function isExistsReview($transactionId)
    {
        $dbResult = $this->db->selectFirst(
            "SELECT transaction_id, rating, comment
                         FROM reviews
                         WHERE transaction_id = :transactionId",
            [':transactionId' => $transactionId]
        );
        return $dbResult;
    }
}