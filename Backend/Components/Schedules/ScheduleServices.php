<?php


namespace Components\Schedules;


use Core\BaseModel;

class ScheduleServices extends BaseModel
{

    public function getScheduleDetail(int $scheduleId)
    {
        $dbResult = $this->db->selectFirst(
            "SELECT *
                         FROM schedules
                         WHERE id = :id",
            [':id' => $scheduleId]
        );
        return $dbResult;
    }
}