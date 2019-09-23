<?php


namespace App\Models;


use App\Core\BaseModel;

class Booking extends BaseModel
{
    public function getAvailableSeatsByScheduleID($scheduleID)
    {
        $dbResult = $this->db->execute(
            "SELECT seat_number
                        FROM seats
                        WHERE schedule_id = $scheduleID");
        $dbResult = $dbResult->getQueryResult();

        $seatConditions = array_fill(1, 30, false);
        foreach ($dbResult as $row)
        {
            $seatConditions[$row->seat_number] = true;
        }
        return $seatConditions;
    }

    public function getScheduleInfoByID($scheduleID){
        $dbResultScheduleInfo = $this->db->execute(
          "SELECT * FROM schedules WHERE id=$scheduleID"
        );
        $dbResultScheduleInfo = $dbResultScheduleInfo->getQueryResult();

        $movieID = $dbResultScheduleInfo[0]->movie_id;
        $dbResultMovieTitle = $this->db->execute(
          "SELECT title FROM movies WHERE id=$movieID"
        );
        $dbResultMovieTitle = $dbResultMovieTitle->getQueryResult();

        $scheduleInfo['date_time'] = $dbResultScheduleInfo[0]->date_time;
        $scheduleInfo['available_seats'] = $dbResultScheduleInfo[0]->available_seats;
        $scheduleInfo['is_available'] = ($scheduleInfo['available_seats'] > 0);
        $scheduleInfo['movie'] = $dbResultMovieTitle[0]->title;

        return $scheduleInfo;
    }
}