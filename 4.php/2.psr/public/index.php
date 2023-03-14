<?php

declare(strict_types=1);

// Bootstrap the app environment.
chdir(dirname(__DIR__));
require_once 'vendor/autoload.php';

$request = Laminas\Diactoros\ServerRequestFactory::fromGlobals(
    $_SERVER, $_GET, $_POST, $_COOKIE, $_FILES
);

$router = new League\Route\Router;

// Catch 404, 4xx, and 5xx errors.
// https://github.com/thephpleague/route/issues/165
try {
    // Register all middleware.
    require 'middleware.php';

    // Register all routes.
    require 'router.php';

    $response = $router->dispatch($request);
} catch(Exception $exception) {
    $status = method_exists($exception, 'getStatusCode') ?
        (int) $exception->getStatusCode() :
        (int) $exception->getCode();

    // Must be an integer between 100 and 599.
    $status = ($status >= 100) && ($status <= 599) ? $status : 500;
    $data = [
        "status" => $status,
        "message" => $exception->getMessage()
    ];

    // Enable CORS for all exceptions.
    $cors = require './config/cors.php';
    $response = new Laminas\Diactoros\Response\JsonResponse($data, $status, [
        'Access-Control-Allow-Origin' => [ $cors['origin'] ]
    ]);
}

// Send the response to the browser.
(new Laminas\HttpHandlerRunner\Emitter\SapiEmitter)->emit($response);
