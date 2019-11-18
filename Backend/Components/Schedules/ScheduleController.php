<?php


namespace Components\Schedules;


class ScheduleController
{
    public function getDetail(int $scheduleId): void
    {
        $scheduleDetail = array(
            'datetime' => 'October 2, 2019 - 02.00 PM',
            'title' => 'Joker',
            'seat' => 31412512
        );
        if (count($scheduleDetail) === 0) {
            http_response_code(204);
            echo json_encode(array(
                'message' => 'there is no schedule with that id'
            ));
        }
        http_response_code(200);
        echo json_encode($scheduleDetail);
    }
}