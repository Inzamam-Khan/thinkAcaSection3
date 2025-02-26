# Product Management API

A secure REST API for managing products with JWT authentication and rate limiting. This API allows users to sign up, log in, and perform CRUD operations (Create, Read, Update, Delete) on products. Rate limiting is implemented to ensure that no user exceeds 100 requests per hour.

## Features

- **User Authentication**: Sign up and login with JWT (JSON Web Tokens).
- **Product Management**: CRUD operations for managing products.
- **Rate Limiting**: Limit users to 100 requests per hour.

## Requirements

- Node.js (>= 14.x)



## Installation

### 1. Clone the repository

```bash
git clone https://github.com/Inzamam-Khan/thinkAcaSection3.git

```

### 2.Install Dependencies
npm install

### 3.Configure Environment Variables File

JWT_SECRET=your_jwt_secret_key
JWT_EXPIRATION=1h
PORT=5000

## Run the Backend Server 
node server.js

# API Endpoints

## Authentication Routes 

**POST /auth/signup**: Register a new user.
```bash
{
  "username": "john_doe",
  "password": "password123"
}
```


**POST /auth/login**: Login to get a JWT token.
```bash
{
  "username": "john_doe",
  "password": "password123"
}
```

## Products Routes

**POST /products**: Create a new product.
```bash
{
  "name": "iphone15 2024",
  "price": $450,
  "description": "this is latest iphone15 2024 with blue shiny glass with the latest security features."
}
```

**GET /products**: Get all products.

**PUT /products/:id**: Update a product by ID.

```bash 
{
  "name": "Updated iphone15 2025",
  "price": $550,
  "description": "this is latest iphone15 2025 with red shiny glass with the latest updated security features."
}
```

**DELETE /products/:id**: Delete a product by ID.

## Authentication Middleware ##
 Authorization: Bearer <yourJwtTokenHere>


 ## Technologies Used in backend ##

**Node.js**: Backend JavaScript runtime.
**Express**: Web framework for building RESTful APIs.
**JWT (JSON Web Token)**: For secure user authentication.
**bcryptjs**: For password hashing.
**express-rate-limit**: For rate limiting.
**dotenv**: For managing environment variables.


## Project Structure ##
.
├── .env               # Environment variables
├── server.js          # Main server file
├── routes/            # API route handlers
│   ├── auth.js        # Authentication routes
│   └── products.js    # Product management routes
└── middleware/        # Middleware functions
    └── authMiddleware.js  # JWT authentication middleware

# Testing #

## Signup ## 

**Method: POST**
URL: http://localhost:8080/auth/signup

## Login ##

**Method: POST**
URL: http://localhost:8080/auth/login

## Create Product ##

**Method: POST**
URL: http://localhost:5000/products

```bash 
Authorization: Bearer <JWT Token>
```




