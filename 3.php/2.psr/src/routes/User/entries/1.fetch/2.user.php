<?php
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Laminas\Diactoros\Response\JsonResponse;

use NameA\Database\MySQL;
use NameA\User\Fetch\User;

// Get a user by slug.
// http://0.0.0.0:8181/users/jane
$router->get('/users/{slug}', function (ServerRequestInterface $request, array $args) : ResponseInterface {
    $connection = (new MySQL())->connect();
    $row = (new User($connection))->fetch($args);
    
    return new JsonResponse($row);
});
