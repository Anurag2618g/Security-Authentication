# Authentication and security Website

This project is a web application that allows users to share their secrets anonymously. It includes user registration, login, and authentication using Passport.js.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [License](#license)

## Features

- User Registration
- User Login
- Password Hashing with bcrypt
- User Authentication with Passport.js
- Session Management
- Display Secrets Page for Authenticated Users

## Installation

1. Install dependencies:

    ```bash
    npm install
    ```

2. Set up the PostgreSQL database:

    - Create a database named `secrets`.
    - Create a table named `users` with columns `id`, `email`, and `password`.

    ```sql
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL
    );
    ```

3. Create a `.env` file in the root directory and add your database credentials:

    ```env
    DB_USER=postgres
    DB_HOST=localhost
    DB_DATABASE=secrets
    DB_PASSWORD=123456
    DB_PORT=5432
    ```

4. Start the server:

    ```bash
    node app.js
    ```

    The application will be running on `http://localhost:3000`.

## Usage

1. Go to `http://localhost:3000` to access the home page.
2. Click on "Register" to create a new account.
3. Log in using the credentials you registered with.
4. After logging in, you will be redirected to the secrets page where you can view shared secrets.

## Project Structure

```arduino
.
├── public
│   └── css
│       └── styles.css
├── views
│   ├── partials
│   │   ├── footer.ejs
│   │   ├── header.ejs
│   ├── home.ejs
│   ├── login.ejs
│   ├── register.ejs
│   ├── secrets.ejs
├── .env
├── app.js
├── package.json
└── README.md


Here's the updated README.md with the changes you requested:

markdown
Copy code
# Secrets Sharing Website

This project is a web application that allows users to share their secrets anonymously. It includes user registration, login, and authentication using Passport.js.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [License](#license)

## Features

- User Registration
- User Login
- Password Hashing with bcrypt
- User Authentication with Passport.js
- Session Management
- Display Secrets Page for Authenticated Users

## Installation

1. Install dependencies:

    ```bash
    npm install
    ```

2. Set up the PostgreSQL database:

    - Create a database named `secrets`.
    - Create a table named `users` with columns `id`, `email`, and `password`.

    ```sql
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL
    );
    ```

3. Create a `.env` file in the root directory and add your database credentials:

    ```env
    DB_USER=postgres
    DB_HOST=localhost
    DB_DATABASE=secrets
    DB_PASSWORD=123456
    DB_PORT=5432
    ```

4. Start the server:

    ```bash
    node app.js
    ```

    The application will be running on `http://localhost:3000`.

## Usage

1. Go to `http://localhost:3000` to access the home page.
2. Click on "Register" to create a new account.
3. Log in using the credentials you registered with.
4. After logging in, you will be redirected to the secrets page where you can view shared secrets.

## Project Structure

```arduino
.
├── public
│   └── css
│       └── styles.css
├── views
│   ├── partials
│   │   ├── footer.ejs
│   │   ├── header.ejs
│   ├── home.ejs
│   ├── login.ejs
│   ├── register.ejs
│   ├── secrets.ejs
├── .env
├── app.js
├── package.json
└── README.md

-public/css/styles.css: CSS styles for the application.
-views: EJS templates for rendering HTML pages.
-app.js: Main server file.
-.env: Environment variables.
-package.json: Project metadata and dependencies.

## Technologies Used
-Node.js
-Express.js
-Passport.js
-bcrypt
-PostgreSQL
-EJS
-Bootstrap