# Patient Appointments Project

This repository hosts a comprehensive solution for managing patient appointments, including frontend, backend, and workflow orchestration. The project is structured into four main components: a React frontend application, two backend API implementations (TypeScript and Java), and a Temporal IO project for workflow orchestration.

## Index

1. [Project Structure](#project-structure)
2. [Descriptions](#descriptions)
3. [Running the Project](#running-the-project)


## Project Structure

- [appointments-app-backend](appointments-app-backend)
- [appointments-app-backend-java](appointments-app-backend-java)
- [appointments-app-frontend](appointments-app-frontend)
- [patients-appointments-temporal](patients-appointments-temporal)

## Descriptions

### Backend (TypeScript)
This project is a simple REST API application for retrieving patient appointments, built using AWS SAM (Serverless Application Model) and TypeScript.

### Backend (Java)
This project is a REST API application for retrieving patient appointments, built using AWS SAM and Java.

### Frontend
This project is a React application for retrieving and displaying patient appointments using a REST API.

### Temporal IO
This repository hosts Temporal workflows for orchestrating services and activities related to the Patients Appointments API.

## Running the Project
### Running Backend (TypeScript) Locally
Navigate to the `appointments-app-backend` directory.

Run the SAM application locally:
```bash
sam build
sam local start-api
```
### Running Backend (Java) Locally
Navigate to the `appointments-app-backend-java` directory.
Run the SAM application locally:
```bash
sam build
sam local start-api
```
### Running Frontend with Backend
Navigate to the `appointments-app-frontend` directory.

Open the `.env` file and set `REACT_APP_BACKEND_API_BASE_URL`to the appropriate API URL:

For TypeScript and Java backend: [http://127.0.0.1:3000](http://127.0.0.1:3000)

For running in the cloud use the API Gateway relevant to each project when deployed.