# Patient Appointments React App

This project is a simple React application for retrieving patient appointments. The application uses a REST API to fetch appointment data and displays the results in a user-friendly interface.

## Index

1. [Application Directory Structure](#application-directory-structure)
2. [Prerequisites](#prerequisites)
3. [Setup Instructions](#setup-instructions)
4. [Run the app in development mode locally](#run-the-app-in-development-mode-locally)
5. [Run tests](#run-tests)
6. [Build the app for production](#build-the-app-for-production)

## Application Directory Structure

The source code for the application resides in the /src directory

```bash
.
├── README.md             # Project documentation
├── package.json          # Contains project dependencies and scripts
├── public                # Contains public assets for the app
├── src                   # Source code directory
│   ├── components            # Contains React components
│   ├── services             # Contains services for fetching data from the API
│   ├── styles               # Contains CSS styles for the application
│   └── tests                # Contains unit tests
└── .env                  # Environment variables file
```

## Prerequisites

Before you begin, make sure you have the following software installed on your system:

Node.js (version 14.x or later)
A package manager (such as npm or yarn)

## Setup Instructions

Install project dependencies:

```bash
npm install
```

in .env file, uncomment the environment variable that matches the API environment you will connect to
```bash
REACT_APP_BACKEND_API_BASE_URL=<your_api_base_url>
```

## Run the app in development mode locally

To run the app in development mode, simply execute the following command:

```bash
npm start
```

## Run tests
To run the tests, execute the following command:

```bash
npm test
```

## Build the app for production
To create an optimized production build, execute the following command:

```bash
npm run build
```
This command will generate a build directory containing the production-ready files.

