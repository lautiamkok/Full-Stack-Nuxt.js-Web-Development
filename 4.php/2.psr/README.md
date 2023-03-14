# PHP PSR REST API

> Build a PHP REST API based on [PSRs](https://www.php-fig.org/).

## App Setup


1. Install dependencies:

    ``` bash
    $ composer install
    ```

2. Serve with built-in webserver at `0.0.0.0:8181`:

    ``` bash
    $ php -S 0.0.0.0:8181 -t public
    ```

    If you want to run the basic examples in the `/public/` directory:

    ``` bash 
    $ php -S 0.0.0.0:8181 ./public/basic-example.php
    $ php -S 0.0.0.0:8181 ./public/basic-cors-example.php
    ```
