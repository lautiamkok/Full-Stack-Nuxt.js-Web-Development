# Default starter for Gridsome

This is the project you get when you run `gridsome create new-project`.

### 1. Install Gridsome CLI tool if you don't have

`npm install --global @gridsome/cli`

### 2. Create a Gridsome project

1. `gridsome create my-gridsome-site` to install default starter
2. `cd my-gridsome-site` to open the folder
3. `gridsome develop` to start a local dev server at `http://localhost:8080`
4. Happy coding 🎉🙌

## Setup

Make sure to install the dependencies:

```bash
# Switch Node.js to version 8.
$ nvm use 8

# Now install.
$ npm install
```

## Development Server

Start the development server on http://localhost:8080 or  http://localhost:8081

```bash
# Switch Node.js to version 8.
$ nvm use 8

# Run to develop the app.
$ npm run develop

# Or:
$ gridsome develop
```

## Production

Build the application for production:

```bash
# Switch Node.js to version 8.
$ nvm use 8

# Run to build the app.
$ npm run build

# Or:
$ gridsome build
```

Only do this step if you are using Gridsome to generate a static site. Otherwise, just use the development step to serve the GraphQL data layer for your client site (e.g. a Nuxt app).

## Querying Data

Keep all Markdown files in the `/data/` directory so that it can be queried using GraphQL in cross-domain apps.

Use the following URL to explore and test your contents:

```bash
http://localhost:8081/___explore
```

Use the following URL to query your contents from a client site:

```bash
http://localhost:8081/___graphql
```

Use cURL to do a quick test fromm your terminal, for example:

```bash
$ curl --request POST \
  --header 'content-type: application/json' \
  --url http://0.0.0.0:8081/___graphql \
  --data '{"query":"query { allPost { edges { node { path } } } }"}'
```

## Requesting Static Images

Keep all images in the `/static/` directory so that it can be requested publicly in cross-domain apps.

Example:

```bash
http://localhost:8081/images/R0000096.jpg
```
