<?php
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Laminas\Diactoros\Response\JsonResponse;

use NameA\Database\MySQL;
use NameA\User\Create\User;

// Add a user:
// $ curl -d "name=John&slug=john" -X POST http://0.0.0.0:8181/user
$router->post('/user', function (ServerRequestInterface $request, array $args) : ResponseInterface {
    $connection = (new MySQL())->connect();
    $result = (new User($connection))->create($request);
    
    return new JsonResponse($result);
});
