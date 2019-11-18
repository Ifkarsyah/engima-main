<?php


namespace Core;


use Utilities\Database;

/**
 * Class BaseModel
 * @package Core
 */
class BaseModel
{
    protected $dbLocal;

    public function __construct()
    {
        $this->dbLocal = Database::getInstance();
    }
}