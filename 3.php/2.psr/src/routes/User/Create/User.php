<?php
namespace NameA\User\Create;

// Import external packages:
use Psr\Http\Message\ServerRequestInterface;
use Ramsey\Uuid\Uuid;

// Import local packages:
use NameA\User\Base;

// Add a user:
// $ curl -d "name=John&slug=john" -X POST http://0.0.0.0:8181/user
class User extends Base
{
    public function create(ServerRequestInterface $request)
    {
        // Get params and validate them here.
        $params = $request->getParsedBody();
        $name = $params['name'];
        $slug = $params['slug'];

        // print_r(get_class_methods($request));
        // print_r($request->getParsedBody());
        // print_r($request);
        // die();

        // Create a timestamp.
        $date = new \DateTime();
        $createdOn = $date->getTimestamp();
        // Or:
        // $createdOn = time();

        // Generate a version 3 (name-based and hashed with MD5) UUID object.
        // https://github.com/ramsey/uuid
        $uuid3 = Uuid::uuid3(Uuid::NAMESPACE_DNS, $slug);
        $id = $uuid3->toString();

        // Throw if empty.
        if (!$id) {
            throw new \Exception('$id is empty', 400);
        }

        // Throw if empty.
        if (!$name) {
            throw new \Exception('$name is empty', 400);
        }

        // Throw if empty.
        if (!$slug) {
            throw new \Exception('$slug is empty', 400);
        }

        // Throw if empty.
        if (!$createdOn) {
            throw new \Exception('$createdOn is empty', 400);
        }

        // Assuming this is a model in a more complex app system.
        $model = new \stdClass;
        $model->id = $id;
        $model->name = $name;
        $model->slug = $slug;
        $model->created_on = $createdOn;

        // Insert user.
        // https://medoo.in/api/insert
        $result = $this->database->insert('users', [
            'id' => $model->id,
            'name' => $model->name,
            'slug' => $model->slug,
            'created_on' => $model->created_on,
            'updated_on' => $model->created_on
        ]);

        // Throw if it fails.
        // Returns the number of rows affected by the last SQL statement.
        if ($result->rowCount() === 0) {
            throw new \Exception('Insert row failed', 500);
        }

        // Return the model if it is OK.
        return $model;
    }
}
