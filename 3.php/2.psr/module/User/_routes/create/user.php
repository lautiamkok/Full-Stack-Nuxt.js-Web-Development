<?php
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Laminas\Diactoros\Response\JsonResponse;

use Spectre\User\Controller\Create\User as CreateUser;

// Add a user:
// $ curl -d "name=John&slug=john" -X POST http://0.0.0.0:8181/user
$router->post('/user', function (ServerRequestInterface $request, array $args) : ResponseInterface {
    $database = require './core/mysql.php';
    $controllerCreateUser = new CreateUser($database);

    // Obtain result.
    $user = $controllerCreateUser->create($request);
    return new JsonResponse($user);
});
