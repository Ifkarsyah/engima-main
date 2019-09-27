<?php


namespace App\Models;


use App\Core\BaseModel;

/**
 * Class Detail
 * @package App\Models
 */
class Detail extends BaseModel
{
    /**
     * @param $movieID
     * @return mixed
     */
    public function getListScheduleByMovieID($movieID)
    {
        $result = $this->db->execute("
                        SELECT date_time, available_seats 
                        FROM schedules 
                        WHERE schedules.movie_id = :movieID /*AND date_time >= NOW()*/",
            ['movieID' => $movieID]);
        return $result->getQueryResult();
    }

    /**
     * @param $movieID
     * @return mixed
     */
    public function getListReviewByMovieID($movieID)
    {
        $result = $this->db->execute(
            "SELECT u.username, u.profile_pic, rating, comment
                         FROM 
                              reviews r JOIN transactions t on r.transaction_id = t.id 
                                        JOIN users u on t.user_id = u.id
                         WHERE r.movie_id = :movieID
                         LIMIT 3",
            ['movieID' => $movieID]
        );
        return $result->getQueryResult();
    }


    public function getMovieDetailByMovieID($movieID)
    {
        $result = $this->db->execute(
                "SELECT m.id, m.title, m.duration, m.released_date, m.plot, m.poster, m.rating, GROUP_CONCAT(g.name) AS genres
                             FROM movies m JOIN movie_genres mg ON m.id = mg.movie_id JOIN genres g ON mg.genre_id = g.id
                             WHERE m.id = :movieID
                             GROUP BY m.id",
            ['movieID' => $movieID]
        );
        return $result->getQueryResult();
    }
}