<?php

declare(strict_types=1);

namespace NameA\Database;

class MySQL
{
    protected $connection;

    public function __construct()
    {
        $dbconfig = require './config/mysql.php';
        $this->connection = new \Medoo\Medoo([
            'database_type' => 'mysql',
            'database_name' => $dbconfig['name'],
            'server' => $dbconfig['host'],
            'username' => $dbconfig['username'],
            'password' => $dbconfig['password']
        ]);
    }

    public function connect() 
    {
        return $this->connection;
    }
}
