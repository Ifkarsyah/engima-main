<?php


namespace App\Core;


use App\Utilities\Database;

class BaseModel
{
    protected $db;

    public function __construct()
    {
        $this->db = Database::getInstance();
    }
}