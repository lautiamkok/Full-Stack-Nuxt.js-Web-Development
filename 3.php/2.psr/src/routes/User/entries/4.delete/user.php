<?php
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Laminas\Diactoros\Response\JsonResponse;

use NameA\Database\MySQL;
use NameA\User\Delete\User as DeleteUser;

// Delete a user by id:
// $ curl -d "id=<id>" -X DELETE http://localhost:8181/user
$router->delete('/user', function (ServerRequestInterface $request, array $args) : ResponseInterface {
    $connection = (new MySQL())->connect();
    $result = (new DeleteUser($connection))->delete($request);
    
    return new JsonResponse($result);
});
