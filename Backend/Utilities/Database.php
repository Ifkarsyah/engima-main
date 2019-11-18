<?php


namespace Utilities;


use PDO;
use PDOException;

/**
 * Class Database:
 * Database Wrapper
 * @package Utilities
 */
class Database
{
    private static $instance = null;
    private $conn;

    private $queryResult;
    private $queryResultCount;

    /**
     * @return mixed
     */
    public function getQueryResult()
    {
        return $this->queryResult;
    }

    /**
     * @return mixed
     */
    public function getQueryResultCount()
    {
        return $this->queryResultCount;
    }

    /**
     * Database constructor.
     * @todo
     */
    private function __construct()
    {
        try {
            $dbHost = DB_HOST;
            $dbName = DB_NAME;
            $this->conn = new PDO("mysql:host={$dbHost};dbname={$dbName}", DB_USER, DB_PASS);
        } catch (PDOException $e) {
            die($e->getMessage());
        }
    }

    /**
     * Get Instance:
     * Prevent multiple instance by implementing singleton design pattern
     * @return Database
     */
    public static function getInstance(): Database
    {
        if (!isset(self::$instance)) {
            self::$instance = new Database();
        }
        return self::$instance;
    }

    /**
     * Execute sql query
     * @param string $sqlStatement
     * @param array $params
     * @return $this
     * @example $db->execute('SELECT * FROM users WHERE user.id = :id', ['id' => $id])
     */
    public function execute($sqlStatement, array $params = [])
    {
        $currentQuery = $this->conn->prepare($sqlStatement);
        foreach ($params as $key => $value) {
            $currentQuery->bindValue($key, $value);
        }

        if ($currentQuery->execute()) {
            $this->queryResult = $currentQuery->fetchAll(PDO::FETCH_OBJ);
            $this->queryResultCount = $currentQuery->rowCount();
        }

        return $this;
    }
}