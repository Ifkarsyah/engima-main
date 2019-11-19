<?php

namespace Core;

/**
 * Class BaseController
 * @package Core
 */
class BaseController
{
    protected $view = null;
    protected $services = null;

    /**
     * BaseController constructor.
     */
    public function __construct()
    {
        require_once 'BaseModel.php';
        $this->services = new BaseModel();
    }


    public function response400()
    {
        http_response_code(400);
        echo json_encode(array('message' => 'your body request format is false'));
    }
}
