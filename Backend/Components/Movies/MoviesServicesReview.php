<?php


namespace Models;


use Core\BaseModel;

/**
 * Class MovieReviewController
 * @package Models
 */
class MoviesServicesReview extends BaseModel
{
    public function getMovieFromTransaction($transactionID)
    {
        $result = $this->dbLocal->execute(
            "SELECT m.id, m.title 
                         FROM transactions t JOIN schedules s ON t.schedule_id = s.id
                            JOIN movies m ON s.movie_id = m.id
                         WHERE t.id = :transactionID",
            ['transactionID' => $transactionID]
        );
        return $result->getQueryResult()[0];
    }

    public function insertNewComment($transactionID, $movie_id, $rating, $comment)
    {
        $this->dbLocal->execute(
            "INSERT INTO reviews (transaction_id, movie_id, rating, comment) 
                         VALUES (:transactionID, :movieID, :rating, :comment)",
            [
                'transactionID' => $transactionID,
                'movieID' => $movie_id,
                'rating' => $rating,
                'comment' => $comment,
            ]
        );

        $rated = $this->dbLocal->execute(
            "SELECT rating FROM movies WHERE movie_id = :movieID",['movieID' => $movie_id]
        );
        $rated = $rated->getQueryResult()[0]->rating;

        if ($rated)
        {
            $this->dbLocal->execute(
                "UPDATE movies SET rating = (rating * numRating + :newRating)/( numRating + 1) WHERE id = :movieID",
                [
                    'movieID' => $movie_id,
                    'newRating' => ($rating + 'rating')
                ]
            );
            $this->dbLocal->execute(
                "UPDATE movies SET numRating = ( :numRating + 1 ) WHERE id = :movieID",
                [
                    'movieID' => $movie_id,
                    'numRating' => ($numRating)
                ]
            );
        }
        else
        {
            $this->dbLocal->execute(
                "UPDATE movies SET rating = :newRating WHERE id = :movieID",
                [
                    'movieID' => $movie_id,
                    'newRating' => $rating
                ]
            );
            $this->dbLocal->execute(
                "UPDATE movies SET (numRating = 1) WHERE id = :movieID",
                [
                    'movieID' => $movie_id,
                    'numRating' => ($numRating)
                ]
            );
        }


    }
}