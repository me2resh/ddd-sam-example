# Patients Appointments API

This project is a simple REST API application for retreiving patient appointments. The application is built using AWS SAM (Serverless Application Model) and TypeScript.

## Application Directory Structure
The source code for the application resides in the `/src` directory

```bash
.
├── README.md         # Project documentation
├── samconfig.toml    # AWS SAM CLI configuration file
├── src               # Source code directory
│   ├── application       # Contains application services
│   ├── command           # Contains command scripts, e.g., for running the app using lambda
│   ├── domain            # Contains the domain model and logic
│   ├── infrastructure    # Contains infrastructure classes that connects to external services.
│   └── tests             # Contains unit tests
└── template.yaml     # AWS SAM template defining lambda resource
```

## Prerequisites
Before you begin, make sure you have the following software installed on your system:

- Node.js 
- Docker
- AWS SAM CLI 

## Setup Instructions
Install project dependencies

```bash
npm install
```

## Run tests
To run the tests, simply execute the following command:

```bash
npm test
```

## Running SAM Locally
To run the SAM application locally, you need to have the AWS SAM CLI installed. If you haven't installed it yet, follow the official installation guide.

Once you have the SAM CLI installed, navigate to the project's root directory and execute the following command:
```bash
sam build
sam local start-api
```

## Invoking APIs for Each User
To invoke the APIs for each user, use the following endpoints:

- User1: http://127.0.0.1:3000/patients/user1/appointments
- User2: http://127.0.0.1:3000/patients/user2/appointments


## Deploy to the cloud
To build and deploy your application for the first time, run the following in your shell:

```bash
sam build
sam deploy --guided
```
