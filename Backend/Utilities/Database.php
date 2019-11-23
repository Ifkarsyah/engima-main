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
    private static $instance;
    private $conn;

    private $queryResult;
    private $queryResultCount;

    /**
     * @return mixed
     */
    public function getQueryResult(): array
    {
        return $this->queryResult;
    }

    /**
     * @return mixed
     */
    public function getQueryResultCount(): int
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
            $this->queryResult = array();
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

    public function selectFirst($sqlStatement, array $params = [])
    {
        $this->execute($sqlStatement, $params);
        if (isset($this->getQueryResult()[0]))
        {
            return (array) $this->getQueryResult()[0];
        }
        return null;
    }

    public function insert($sqlStatement, array $params = [])
    {
        $this->execute($sqlStatement, $params);
    }

    public function update($sqlStatement, array $params = [])
    {
        $this->execute($sqlStatement, $params);
    }

    public function select($sqlStatement, array $params = [])
    {
        $this->execute($sqlStatement, $params);
        if (isset($this->getQueryResult()[0]))
        {
            $result = array();
            foreach ($this->getQueryResult() as $i => $row)
            {
                $a = (array) $this->getQueryResult()[$i];
                array_push($result, $a);
            }
            return $result;
        }
        return null;
    }
}