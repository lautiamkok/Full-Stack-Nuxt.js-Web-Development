<?php
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Laminas\Diactoros\Response\JsonResponse;

use NameA\Database\MySQL;
use NameA\User\Update\User;

// Update a user by uuid:
// $ curl -d "name=Johnny&slug=johnny&id=<id>" -X PUT http://localhost:8181/user
$router->put('/user', function (ServerRequestInterface $request, array $args) : ResponseInterface {
    $connection = (new MySQL())->connect();
    $result = (new User($connection))->update($request);
    
    return new JsonResponse($result);
});
