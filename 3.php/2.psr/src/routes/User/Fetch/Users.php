<?php
namespace NameA\User\Fetch;

// Import local packages:
use NameA\User\Base;

// GET http://0.0.0.0:8181/users
class Users extends Base
{
    public function fetch()
    {
        // Columns to select.
        $columns = [
            'id',
            'name',
            'slug',
            'created_on',
            'updated_on',
        ];

        // Get user(s).
        // https://medoo.in/api/select
        return $this->database->select('users', $columns);
    }
}
