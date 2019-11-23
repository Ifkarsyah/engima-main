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

    public function reserve($scheduleId, $seat)
    {
        $this->db->update(
            "UPDATE schedules
                         SET seats = (seats & (~(1 << (30 - $seat))))
                         WHERE id = :scheduleId",
            [':scheduleId' => $scheduleId]
        );
    }

    public function release($scheduleId, $seat)
    {
        $this->db->update(
            "UPDATE schedules
                         SET seats = (seats | (1 << (30 - $seat)))
                         WHERE id = :scheduleId",
            [':scheduleId' => $scheduleId]
        );
    }
}