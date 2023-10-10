# TaskPhin Technical CRUD App Backend (Node.js)
TaskPhin Technical CRUD App is a Node.js application that provides a basic CRUD API (Login , Register , Favorite Movies List, Add New Movie,Update Exsiting and Delete ) for managing movie data in a Postgres database and Prisma ORM. The API includes user authentication using JSON Web Tokens (JWT) and password hashing using bcrypt. It utilizes the Prisma ORM for defining and interacting with the database schema.

# taskphin-server
|-- Controller
|   -- user.controller.js     # Contains controller functions for user-related and movie actions
|-- DB
|   -- db.config.js           # Configuration for connecting to the Postgres database
|-- Middleware
|   -- user_authenticate.js   # Middleware for user authentication
|-- prisma
|   -- schema.prisma          # Prisma ORM schema for defining the database structure
|-- routes
|   -- user.routes.js         # Define API routes for user-related actions
|-- .env                      # Environment variables configuration file
|-- node_modules              # Node.js dependencies (automatically generated)
|-- package.json              # Project dependencies and metadata
|-- package-lock.json         # Lock file for precise dependency management
|-- server.js                 # Entry point for the Node.js server


# Installation
Before running the project, make sure you have the following prerequisites installed on your machine:

Postgress Databse (pgAdmin 4)
Node.js

# Follow these steps to set up and run the project:
cd taskphin-server
=> npm install

# Database Setup:
Create a Postgres database and update the DB_URL in the .env file with the database connection URL.

# Run Migrations: 
Run Prisma migrations to create and update the database schema.

- npx prisma init

- npx prisma migrate dev --name init

# Start the Node.js server:
- npm start
The server will run on port 5000 by default. You can modify the port in the .env file if needed.

# API Endpoints

POST /api/register - Register a new user.

POST /api/login - Log in as an existing user and receive a JWT.

GET /api/fav-movie - Get a list of favorite movies for the authenticated user.

POST /api/add-movie - Add a new movie to the user's list of favorite movies.

PUT /api/edit-movie/:id - Update movie details by ID.

DELETE /api/delete-movie/:id - Delete a movie from the user's list of favorite movies.

# User Authentication
This project uses JWT for user authentication. To access protected routes, you must include a valid JWT token in the request header as follows:
