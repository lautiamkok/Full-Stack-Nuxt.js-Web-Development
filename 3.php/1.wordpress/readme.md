# Barebone API

> Build a barebone WordPress REST API.

## Dev Setup

1. Install dependencies:

    ``` bash
    $ cd /path/to/your/wordpress/wp-content/themes/headlessapi-v1/
    $ composer install
    ```

2. Serve with built-in webserver at `0.0.0.0:4000`:

    ``` bash
    $ cd /path/to/your/wordpress/
    $ php -S 0.0.0.0:4000
    ```

3. Or, use Apache to create a 4000 port to run the app:

    ``` bash
    $ sudo nano /etc/apache2/sites-enabled/000-default.conf

    <VirtualHost *:4000>
          ServerAdmin webmaster@localhost
          DocumentRoot "/var/path/to/your/wordpress"

          ErrorLog ${APACHE_LOG_DIR}/error.log
          CustomLog ${APACHE_LOG_DIR}/access.log combined

          ErrorDocument 404 /
    </VirtualHost>
    ```

4. Add the 4000 port in `ports.conf`:

    ``` bash
    $ sudo nano /etc/apache2/ports.conf

    Listen 4000
    ```

5. Exit the file and restart Apache:

    ```bash
    $ sudo systemctl restart apache2
    ```

6. Access your WordPress at `localhost:4000`.


## Logging in WordPress (Development/ Production)

Use the following usernames and passwords to log in the WordPress admin to manage contents:

1. User 1

    URL:  
    /wp-admin/

    Username:  
    admin

    Password:  
    x32LZ**kpSOzqcbE!3

    Email:  
    lau.thiamkok@yahoo.co.uk
