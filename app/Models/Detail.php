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
                        WHERE schedules.movie_id = $movieID AND date_time >= NOW()");
        return $result->getQueryResult();
    }
}