# GraphQL + Koa + WordPress

> Build a GraphQL server with Koa for querying data from WordPress.

## Setup

Make sure to install the dependencies:

```bash
$ npm install
```

## Development Server

Start the development server on http://localhost:5000

```bash
$ npm run dev
```

## Production

Build the application for production:

```bash
$ npm run build
```

Run the production build:

```bash
$ npm run start
```

## Querying Data

Use the following URL to explore and test your contents:

```bash
http://localhost:5000
```

Use the following URL to query your contents from a client site:

```bash
http://localhost:5000
```

Use cURL to do a quick test fromm your terminal, for example:

```bash
$ curl --request POST \
  --header 'content-type: application/json' \
  --url http://0.0.0.0:5000 \
  --data '{"query":"query { hello }"}'
```


Send a POST request to query this endpoint

curl --request POST \
  --header 'content-type: application/json' \
  --url http://localhost:5000/ \
  --data '{"query":"query { __typename }"}'
