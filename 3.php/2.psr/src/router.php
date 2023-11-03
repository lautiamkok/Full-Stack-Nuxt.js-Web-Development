<?php
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Message\ResponseInterface;
// use Laminas\Diactoros\Response\JsonResponse;

use function NameA\Util\getFiles; 

// Import all routes from the config.
$routes = require 'config/routes.php';
foreach ($routes as $route) {
    $directory = './routes/' . $route . '/entries';
    $files = getFiles($directory);
    foreach ($files as $file) {
        require $file;
    }
}

// $router->get('/', function (ServerRequestInterface $request) : ResponseInterface {
//     return new JsonResponse('Hello world!');
// });

//  Catch-all route to serve a 404 Not Found page if none of the routes match
//  NOTE: make sure this route is defined last
$router->map('GET', '/{routes:.+}', function (ServerRequestInterface $request) : ResponseInterface {
    throw new League\Route\Http\Exception\NotFoundException;
});
