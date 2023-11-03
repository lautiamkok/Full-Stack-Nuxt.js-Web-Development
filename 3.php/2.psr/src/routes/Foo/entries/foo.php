<?php
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Laminas\Diactoros\Response\JsonResponse;

// Example route for returning an error to the front.
// http://0.0.0.0:8181/foo
$router->get('/foo', function (ServerRequestInterface $request) : ResponseInterface {
    // Throw or return error.
    // return new JsonResponse('Hello world!', 404);
    // or:
    // throw new \Exception('error', 400);
    // or:
    throw new League\Route\Http\Exception\BadRequestException;
});
