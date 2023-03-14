<?php
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Laminas\Diactoros\Response\JsonResponse;

use Spectre\User\Controller\Delete\User as DeleteUser;

// Delete a user by id:
// $ curl -d "uuid=<uuid>" -X DELETE http://localhost:8181/user
$router->delete('/user', function (ServerRequestInterface $request, array $args) : ResponseInterface {
    $database = require './core/mysql.php';
    $controllerDeleteUser = new DeleteUser($database);

    // Obtain result.
    $user = $controllerDeleteUser->delete($request);
    return new JsonResponse($user);
});
