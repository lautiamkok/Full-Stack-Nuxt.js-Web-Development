<?php
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Laminas\Diactoros\Response\JsonResponse;

use Spectre\User\Controller\Update\User as UpdateUser;

// Update a user by uuid:
// $ curl -d "name=Johnny&slug=johnny&uuid=<uuid>" -X PUT http://localhost:8181/user
$router->put('/user', function (ServerRequestInterface $request, array $args) : ResponseInterface {
    $database = require './core/mysql.php';
    $controllerUpdateUser = new UpdateUser($database);

    // Obtain result.
    $user = $controllerUpdateUser->update($request);
    return new JsonResponse($user);
});
