<?php


namespace Models;


use Core\BaseModel;
use Exception;

/**
 * Class MoviesController
 * @package Models
 */
class MoviesServices extends BaseModel
{
    public function isExistsMovieId($movieId)
    {
        $result = $this->db->selectFirst("
            SELECT movie_id FROM schedules WHERE movie_id = :movieId LIMIT 1
        ", ['movieId' => $movieId]);
        return ($result !== null);
    }

    public function generate($movieId, $releaseDate)
    {
        $showTimes = array();
        $noon = strtotime($releaseDate . ' 2pm');
        $evening = strtotime($releaseDate . ' 6pm');
        $night = strtotime($releaseDate . ' 10pm');
        for ($i = 0; $i <= 7; $i++)
        {
            array_push($showTimes, $noon, $evening, $night);
            $noon += 86400;
            $evening += 86400;
            $night += 86400;
        }
        foreach ($showTimes as $time) {
            $command = $this->db->insert("
                INSERT INTO schedules (movie_id, date_time) VALUES (:movieId, FROM_UNIXTIME($time)) 
            ", ['movieId' => $movieId]);
        }
    }

    /**
     * @param $movieID
     * @return mixed
     * @throws Exception
     */
    public function getMovieSchedules($movieID)
    {
        $result = $this->db->select("
                        SELECT id as schedule_id, date_time, seats 
                        FROM schedules 
                        WHERE schedules.movie_id = :movieID
                    ", ['movieID' => $movieID]);
        return $result;
    }

    /**
     * @param $movieID
     * @return mixed
     */
    public function getListReviewByMovieID($movieID)
    {
        return $this->db->select(
            "SELECT u.username, r.comment, r.rating, u.id
                         FROM reviews as r JOIN users u ON r.userId = u.id
                         WHERE r.movie_id = :movieID
                         ORDER BY rating DESC 
                         LIMIT 3",
            ['movieID' => $movieID]
        );
    }
}