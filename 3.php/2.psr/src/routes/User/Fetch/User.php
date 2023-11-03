<?php
namespace NameA\User\Fetch;

// Import local packages:
use NameA\User\Base;

// GET http://0.0.0.0:8181/users/jane
class User extends Base
{
    public function fetch(array $routeParams)
    {
        // Columns to select.
        $columns = [
            'id',
            'name',
            'slug',
            'created_on',
            'updated_on',
        ];

        // Get user.
        // https://medoo.in/api/get
        $data = $this->database->get('users', $columns, [
            "slug" => $routeParams['slug']
        ]);

        // Throw error if no result found.
        if ($data === NULL) {
            throw new \Exception('No user found', 404);
        }

        return $data;
    }
}
