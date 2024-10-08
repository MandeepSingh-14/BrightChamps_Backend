# BrightChamps_Backend

# User Authentication API

This project is a Node.js application that provides user authentication functionalities including registration, login, password change, and logout. It uses Express.js for the server, MongoDB for data storage, and JSON Web Tokens (JWT) for authentication.

## Features

- **User Registration**: Allows new users to create an account with email and password.
- **User Login**: Authenticates users and provides a JWT token for subsequent requests.
- **Password Change**: Enables users to change their password securely.
- **User Logout**: Logs users out by clearing their JWT token.

## Technologies Used

- **Node.js**: JavaScript runtime for server-side operations.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing user data.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js.
- **Bcryptjs**: Library for hashing passwords.
- **JWT (JSON Web Token)**: Used for creating and verifying tokens.
- **dotenv**: For managing environment variables.
- **cookie-parser**: Middleware for parsing cookies.

## Installation

1. **Clone the Repository**

   ```bash
   git clone <repository-url>
   cd <repository-directory>

1.  **Install Dependencies**

    ```bash

    `npm install`

2.  **Set Up Environment Variables**

    Create a `.env` file in the root directory of the project with the following content:

    
    ```bash
    PORT=8000
    SECRET_KEY=your_jwt_secret_key
    MONGO_URI=your_mongodb_connection_string


    # Replace `your_jwt_secret_key` with a strong secret key for JWT, and `your_mongodb_connection_string` with your MongoDB connection string.

3.  **Start the Server**

    ```bash
    `npm start`

    The server will start and listen on the port specified in the `.env` file or default to port 8000.

API Endpoints
-------------

-   **POST /api/v1/users/register**

    Registers a new user.

    **Request Body:**

    json
    `{
      "fullname": "John Doe",
      "email": "john.doe@example.com",
      "password": "SecureP@ssw0rd!"
    }`

    **Response:**

    json
    `{
      "message": "Account created successfully.",
      "success": true
    }`

-   **POST /api/v1/users/login**

    Logs in an existing user and returns a JWT token.

    **Request Body:**

    json
    `{
      "email": "john.doe@example.com",
      "password": "SecureP@ssw0rd!"
    }`

    **Response:**

    json
    `{
      "message": "User logged in successfully",
      "success": true
    }`

-   **PATCH /api/v1/users/change-password**

    Changes the user's password (requires authentication).

    **Request Body:**

    json
    `{
      "oldPassword": "SecureP@ssw0rd!",
      "newPassword": "NewS3cur3P@ss!"
    }`

    **Response:**

    json
    `{
      "message": "Password changed successfully",
      "success": true
    }`

-   **GET /api/v1/users/logout**

    Logs out the user by clearing the JWT token (requires authentication).

    **Response:**

    json
    `{
      "message": "Logged out successfully.",
      "success": true
    }`

Folder Structure
----------------

-   **`/controllers`**: Contains controller files handling API logic.
-   **`/middleware`**: Contains middleware functions like authentication.
-   **`/model`**: Contains Mongoose models.
-   **`/routes`**: Defines API routes and associates them with controllers.
-   **`/db`**: Contains database connection logic.

License
-------

This project is licensed under the MIT License.