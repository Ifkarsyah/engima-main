<?php


namespace App\Models;


use App\Core\BaseModel;

/**
 * Class Transaction
 * @package App\Models
 */
class Transaction extends BaseModel
{
    public function getTransactionHistory($userID)
    {
        $result = $this->db->execute(
            "SELECT t.id, m.title, m.poster, s.date_time 
                         FROM transactions t JOIN schedules s ON t.schedule_id = s.id
                                JOIN movies m on s.movie_id = m.id
                         WHERE user_id = :userID",
            ['userID' => $userID]
        );
        return $result->getQueryResult();
    }

    public function deleteReview($transactionID)
    {
        $this->db->execute(
            "DELETE FROM reviews WHERE transaction_id = :transactionID",
            ['transactionID' => $transactionID]
        );
    }
}