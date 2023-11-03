<?php
namespace NameA\User;

use Medoo\Medoo;

abstract class Base
{
    protected $database;

    public function __construct(
        Medoo $database
    ) {
        $this->database = $database;
    }
}
