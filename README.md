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
