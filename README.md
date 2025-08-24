# Pet Adoption Portal Backend
----
 Welcome to the backend repository for the Pet Adoption Portal, a web application designed to facilitate pet adoption between Shelters and Adopters. This backend is built using Node.js, Express.js, and MongoDB with Mongoose for data modeling, providing RESTful APIs for user authentication, pet management, and adoption request handling.

## Overview
This backend serves as the server-side component of the Pet Adoption Portal, handling user authentication, pet data management, and adoption workflows. It supports role-based access (Shelter and Adopter) and provides endpoints for CRUD operations on pets and adoption requests.
Features

## Features
User authentication with JWT (login, register, and protected routes).

Role-based access control (Shelter and Adopter).

CRUD operations for pet management (Shelters only).

Adoption request system (Adopters can request, Shelters can approve/reject).

File upload support for pet images using Multer.

## Prerequisites

Node.js (v14.x or later)

MongoDB (local or remote instance)

npm 

Postman or similar API testing tool 
----------------------------------------------------------
## Installation

1. Clone the repository
   ```
   git clone https://github.com/CodeMaestro016/pet-adoption-portal-backend.git
   cd pet-adoption-portal-backend
   ```
2. Install dependencies:
   ```
   npm install
   ```
## Configuration

Create a .env file in the root directory with the following variables:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/pet-adoption-portal
JWT_SECRET=your-secure-jwt-secret
```

## Running the Application
```
npm run dev
```

## API Endpoints

### Authentication
```
POST /api/auth/register - Register a new user (Shelter or Adopter).

POST /api/auth/login - Login and receive a JWT token.

GET /api/auth/me - Get the authenticated user's details (protected).
```
### Pets
```
GET /api/pets - Retrieve all pets (filtered by Shelter if authenticated).

POST /api/pets - Add a new pet (Shelter only, with image upload).

PUT /api/pets/:id - Update a pet (Shelter only).

DELETE /api/pets/:id - Delete a pet (Shelter only).
```
### Adoptions
```
POST /api/adoptions/:petId - Request an adoption (Adopter only).

GET /api/adoptions - Get adoption requests for the authenticated Shelter.

GET /api/my-adoptions - Get adoption requests for the authenticated Adopter.

PUT /api/adoptions/:id - Update the status of an adoption request (Shelter only, approve/reject).

DELETE /api/adoptions/:petId - Cancel an adoption request (Adopter only).
```
## Notes

All protected endpoints require a Authorization: Bearer <token> header.

Image uploads are stored in the uploads/ directory and served statically.














