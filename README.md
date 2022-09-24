Link to site: https://todos.callumbyrne.com/

This is a fully responsive CRUD application with a ReactJS/Vite frontend and a REST API backend built with TypeScript, NodeJS, Express, and MongoDB. The application being a Todo app is not important and was only chosen because a Todo app provides all the basic functionallity for CRUD whilst being simple in nature. The main focus for this project was to build a REST API backend with TypeScript and Express. The API allows for, creating a user, creating and deleting user sessions with cookies, and CRUD functionallity for the todos.


I structured the backend with a modules folder for each resource. Inside each module has a route, controller, service, model and schema file. When a request comes in it will first hit the routes file, which will then call a controller, which will then call a service that will interact with the database. The model files defines the database schema and creates a model and the schema file defines a Zod schema which is used in middleware to verify the request payload before it hits the controllers.


For the frontend I used React with Vite and made the application fully responsive with TailwindCSS.


A main learning point from this project was understanding user authentication using cookies. In previous projects I had only ever stored users in state or local storage. Additonally, I also learned how to deploy an application using Docker, Caddy Server, and Digital Ocean.
