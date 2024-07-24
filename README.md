# Natours API

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This is an Express.js project that provides a simple web server with basic functionality. It demonstrates the use of Express.js for building a RESTful API and handling HTTP requests.

## Installation

1. Clone the repository:

2. Navigate to the project directory:

3. Install the dependencies:

## Usage

1. Start the server:

2. The server will start running at `http://localhost:3000`.

3. You can access the following endpoints:

- `GET /`: Displays a welcome message.
- `GET /api/hello`: Returns a simple "Hello, World!" response.
- `POST /api/users`: Creates a new user (expects a JSON payload in the request body).
- `GET /api/users`: Retrieves a list of all users.

## Features

- Serves a simple web application using Express.js
- Provides a RESTful API with endpoints for handling user-related operations
- Demonstrates the use of middleware, routing, and handling HTTP requests and responses

## Technologies Used

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [body-parser](https://www.npmjs.com/package/body-parser) (for parsing request bodies)

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
