# Full-Stack Nuxt.js Web Development

> Build full-stack server-side rendering (SSR) and static-generated (SSG) Vue.js applications using Nuxt.js (a.k.a. Nuxt), Node.js, and Composition API

This is the code repository for [***Full-Stack Nuxt.js Web Development***](https://lauthiamkok.net/origins/digital/advanced-nuxtjs-web-development), published in January 2024, authored by [Lau Tiam Kok](https://lauthiamkok.net/).

## Course Overview

***Full-Stack Nuxt.js Web Development*** aims to help you build Vue SSR and SSG apps by using Composition API and Nuxt 3+ with other Nuxt-related libraries and high-level frameworks, such as Windi CSS, Less CSS preprocessor, and WordPress. You will learn to structure directories for Nuxt projects and get your Nuxt app built with pages, layouts, routing, and components, and writing stores, middleware, composables, and utility functions (a.k.a. "utilities"). You will learn to manage data in MongoDB, MariaDB/ MySQL, RethinkDB, and Redis for your Nuxt apps. Furthermore, you will manage these databases internally in your Nuxt project with Nitro and externally outside Nuxt with the Node.js HTTP API. Also, you will create a shopping cart system using Pinia, cookies, and Redis; build a GraphQL layer to manage data; generate static pages with WordPress; deploy your Nuxt apps, and last but not least, you will discover other options to build Vue SSR and SSG apps and take your Nuxt journey further.

*Full-Stack Nuxt.js Web Development* is the successor of [***Hands-on Nuxt.js Web Development***](https://lauthiamkok.net/origins/digital/hands-on-nuxtjs-web-development) by the same author. If you have learned Nuxt from its predecessor already, which is based on Nuxt 2+, and would like to upgrade to Nuxt 3+ and update the old NPM packages, frameworks, and tools, please use this course to do so. Whether you are coming from its predecessor or not, you still can pick up and make use of *Full-Stack Nuxt.js Web Development* independently. Just like its predecessor, this course is more into using Nuxt to connect and communicate with other Node.js and PHP applications remotely, such as Node.js HTTP applications, WordPress, and GraphQL servers. With this approach, you can keep your Nuxt.js applications as "thin" as possible while leveraging modern server-side technologies and applications. *Full-Stack Nuxt.js Web Development* is more focused on this idea than its predecessor by removing basic topics, knowledge, skills, and old technologies. Notwithstanding, you may find the core idea, example apps, and some minor text are similar between this course and the book.

## Takeaway Skills

* Create SSR and SSG Vue.js applications using Nuxt and Composition API.

* Create dynamic pages and layouts; composables, plugins, utils, and middleware.

* Handle HTTP errors (e.g. 404 and 500 errors) in Nuxt applications, Node.js applications, and PHP applications.

* Create responsive layouts with Windi CSS and Less; handle static and dynamic assets using composables.

* Manage document head tags for SEO and Open Graph.

* Create a data-persistent (client-server) shopping cart system with Pinia, Redis, and cookies.

* Create REST APIs with the Node.js HTTP API, MongoDB, and MySQL for Nuxt applications.

* Create real-time Nuxt applications with Socket.IO and RethinkDB.

* Create a headless CMS using WordPress for Nuxt applications. 

* Connect WordPress and generate static pages with Nuxt.

* Stream and download remote images from WordPress using the Node.js Stream API for static-generated sites in Nuxt projects.

* Create HMR web servers and GraphQL servers using Vite, the Node.js HTTP API, and the WordPress REST API for Nuxt applications.

* Fetch data using GraphQL queries in Nuxt applications.

## Chapters and Lessons

* Chapter 1. Introducing Full-Stack Nuxt.js Web Development

    Get to know types of apps and find out where Nuxt falls in line with. Start a Nuxt project with Nuxi (Nuxt scaffolding tool). Explore Nuxt's project structure such as the `/server/` and `/public/` directories. Learn about customizing your Nuxt app with the `nuxt.config` file.

    * Lesson 1. Knowing Nuxt and Starting Nuxt projects
    * Lesson 2. Exploring the Nuxt Project Directory Structure
    * Lesson 3. Making Custom Configurations in Nuxt Projects

* Chapter 2. Creating Pages, Layouts, Composables, Plugins, Utilities, and Middleware

    Create static and dynamic pages and static and dynamic routes in Nuxt apps. Create static and dynamic layouts with the `definePageMeta` and `setPageLayout` Nuxt APIs and the `NuxtLayout` Nuxt component. Create auto-import composables (top-level and nested) and utilities. Create client-only and server-only plugins. Install plugins using the `nuxt.config` file. Create auto-import plugins with the `provide` plugin helper. Create global middleware to be executed automatically when route changes are manually applied. Create named middleware to be applied manually on specific pages.

    * Lesson 1. Creating Static and Dynamic Routes
    * Lesson 2. Creating Static and Dynamic Layouts
    * Lesson 3. Creating Plugins and Middleware
    * Lesson 4. Creating Composables and Utilities

* Chapter 3. Managing Assets and Adding UI Frameworks

    Serve public and static assets such as images and fonts in Nuxt projects. Use Windi CSS as a UI framework for Nuxt apps and create responsive layouts with Windi CSS. Write CSS using Less as the CSS preprocessor in your Vue apps. Serve dynamic assets by using composables in the `<template>` block.

    * Lesson 1. Adding UI Frameworks: Windi CSS
    * Lesson 2. Adding CSS Preprocessors: Less
    * Lesson 3. Serving Static Assets
    * Lesson 4. Serving Dynamic Assets

* Chapter 4. Fetching Data and Handling Errors

    Fetch data from remote APIs using the `useFetch` Nuxt API. Handle HTTP errors (e.g. 404 and 500 errors) with the `showError` Nuxt API and the `error.vue` file for unknown routes, internal server errors, and JavaScript default errors during development and runtime.

    * Lesson 1. Fetching Data with `useFetch`
    * Lesson 2. Creating and Handling HTTP Errors
    * Lesson 3. Customizing the Error Page for HTTP Errors

* Chapter 5. Managing States and Stores

    Create global states with the `useState` Nuxt API to be shared between the server and client across components and pages. Manipulate global states from specific pages. Build a counter and a shopping cart system with Pinia. Create a client-server data-persistent store with the `useCookie` Nuxt API. Create a client-server data-persistent store with `localStorage` and Redis.

    * Lesson 1. Creating States with `useState`
    * Lesson 2. Creating Data-Persistent Stores with Pinia and Cookies
    * Lesson 3. Creating Data-Persistent Stores with Pinia and Redis
    * Lesson 4. Creating Data-Persistent Stores with Pinia, `localStorage`, Cookies, and Redis

* Chapter 6. Managing Data with Nitro Server Engine in Nuxt

    Create Nuxt's built-in API layers, API routes, and API calls with server middleware, server plugins, and server utilities. Store and manage data with Nitro's default in-memory data storage. Integrate the MongoDB database internally in the Nuxt apps. Use the Nuxt Content module and Markdown documents as your database in the Nuxt apps.

    * Lesson 1. Creating Server Routes, Server Middleware, Server Plugins, and Server Utilities
    * Lesson 2. Managing Data with In-Memory Data Storage
    * Lesson 3. Managing Data with MongoDB Database
    * Lesson 4. Managing Data with the Nuxt Content Module

* Chapter 7. Managing Data with Node.js Apps for Nuxt

    Create Hot Module Replacement (HMR) Node.js apps with Vite, Node.js HTTP API, and `find-my-way` HTTP router. Create an HMR Node.js app with MySQL database and MongoDB database. Enable CORS in HMR Node.js apps for integrating with your Nuxt app. Create a real-time Nuxt app with RethinkDB and manage your app data with the RethinkDB database, Socket.IO, and the HMR Node.js app.

    * Lesson 1. Creating HMR Node.js HTTP Servers with Vite and the Node.js HTTP Module
    * Lesson 2. Managing Data with MariaDB
    * Lesson 3. Managing Data with MongoDB
    * Lesson 4. Managing Real-time Data with RethinkDB

* Chapter 8. Managing Database with PHP Apps for Nuxt

    Create a custom REST API with WordPress and Carbon Fields (WordPress custom fields library) to serve data for your Nuxt app. Create custom fields with Carbon Fields for managing the SEO and Open Graph meta information dynamically for your Nuxt app. Create a framework-agnostic PHP app that complies with PHP Standards Recommendations (PSR) to serve data for your Nuxt app.

    * Lesson 1. Managing Data with WordPress
    * Lesson 2. Managing Data with PHP PSR Apps
    * Lesson 3. Managing Metadata with WordPress for SEO and Open Graph

* Chapter 9. Building GraphQL Layers with MongoDB, WordPress, and GraphQL Tools for Nuxt

    Introduce GraphQL and its benefits. Create HMR GraphQL apps with GraphQL Tools, Node.js HTTP API, MongoDB, and WordPress for your Nuxt app. Fetch data from GraphQL servers using GraphQL queries in your Nuxt apps. 

    * Lesson 1. Introducing GraphQL and Understanding GraphQL Schema
    * Lesson 2. Creating GraphQL Servers with MongoDB and Node.js HTTP API
    * Lesson 3. Creating GraphQL Servers with WordPress and Node.js HTTP API

* Chapter 10. Creating SSG Sites with Nuxt and WordPress and Going Further

   Create static-generated (SSG) sites with Nuxt and WordPress. Fetch data and stream assets from WordPress into your Nuxt project for making SSG sites. Take your Nuxt app further with testing, deployment, other Nuxt modules, such as Nuxt GTA and Nuxt-Auth, and other Nuxt APIs, such as composable APIs, utility APIs, and component APIs. Look into options, such as using Quasar, Gridsome, and Vite SSR alone or Vite SSR plugins, for building Vue SSR and SSG apps.

    * Lesson 1. Fetching Data from WordPress for Static Sites
    * Lesson 2. Streaming Assets from WordPress for Static Sites
    * Lesson 3. Going Further and Knowing Your Options

If you are interested in this course, please check out [this page](https://lauthiamkok.net/origins/digital/advanced-nuxtjs-web-development) for how to purchase the course guide. Otherwise, feel free to sponsor this repository to keep it going and maintained through the following channels:

* [Open Collective](https://opencollective.com/lautiamkok)
* [Ko-fi](https://ko-fi.com/lautiamkok)
