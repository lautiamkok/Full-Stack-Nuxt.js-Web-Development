<?php
namespace NameA\User\Delete;

// Import external packages:
use Psr\Http\Message\ServerRequestInterface;

// Import local packages:
use NameA\User\Base;

// Delete a user by id:
// $ curl -d "id=<id>" -X DELETE http://localhost:8181/user
class User extends Base
{
    public function delete(ServerRequestInterface $request)
    {
        // Get params and validate them here.
        // $params = $request->getParsedBody();
        parse_str(file_get_contents('php://input'), $params);
        $id = $params['id'];

        // print_r(get_class_methods($request));
        // print_r($params);
        // die();

        // Throw if empty.
        if (!$id) {
            throw new \Exception('$id is empty', 400);
        }

        // Assuming this is a model in a more complex app system.
        $model = new \stdClass;
        $model->id = $id;

        // Delete user(s).
        // https://medoo.in/api/delete
        $result = $this->database->delete("users", [
            "id" => $model->id
        ]);

        // Check the number of rows affected by the last SQL statement.
        // Throw if it fails.
        if ($result->rowCount() === 0) {
            throw new \Exception('Delete row failed', 500);
        }

        // Return the model if it is OK.
        return $model;
    }
}
