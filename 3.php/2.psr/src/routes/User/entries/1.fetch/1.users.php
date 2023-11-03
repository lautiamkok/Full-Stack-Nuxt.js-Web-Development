<?php
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Laminas\Diactoros\Response\JsonResponse;
 
use NameA\Database\MySQL;
use NameA\User\Fetch\Users;

// Get all users.
// http://0.0.0.0:8181/users
$router->get('/users', function (ServerRequestInterface $request) : ResponseInterface {
    $connection = (new MySQL())->connect();
    $rows = (new Users($connection))->fetch();
    
    return new JsonResponse($rows);
});
