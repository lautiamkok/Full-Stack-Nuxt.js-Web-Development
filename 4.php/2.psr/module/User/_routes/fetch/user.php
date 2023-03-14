<?php
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Laminas\Diactoros\Response\JsonResponse;

use Spectre\User\Controller\Fetch\User as FetchUser;

// Get a user by slug.
// http://0.0.0.0:8181/users/jane
$router->get('/users/{slug}', function (ServerRequestInterface $request, array $args) : ResponseInterface {
    $database = require './core/mysql.php';
    $controllerFetchUser = new FetchUser($database);

    // Obtain result.
    $user = $controllerFetchUser->fetch($args);
    return new JsonResponse($user);
});
