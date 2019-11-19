<?php


namespace Core;


use Utilities\Database;

/**
 * Class BaseModel
 * @package Core
 */
class BaseModel
{
    protected $db;

    public function __construct()
    {
        $this->db = Database::getInstance();
    }
}