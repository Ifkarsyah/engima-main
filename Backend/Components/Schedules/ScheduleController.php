<?php


namespace Components\Schedules;


use Core\BaseController;

class ScheduleController extends BaseController
{
    public function __construct()
    {
        parent::__construct();
        require_once 'ScheduleServices.php';
        $this->services = new ScheduleServices();
    }

    public function getDetail(int $scheduleId): void
    {
        $scheduleDetail = $this->services->getScheduleDetail($scheduleId);
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