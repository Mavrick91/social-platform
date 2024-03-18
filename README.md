# Social-Platform

This project is a social media platform that uses a monorepo structure with a React frontend and a NestJS backend, along with Prisma for database operations and GraphQL for API queries.

## Prerequisites

Before starting, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (LTS version)
- [PostgreSQL](https://www.postgresql.org/download/)
- [Prisma CLI](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-cli/installation)

## Getting Started

### 1. Clone the repository

Clone the repository to your local machine and change to the project directory:

```bash
git clone https://github.com/Mavrick91/social-platform.git
cd social-platform
```

### 2. Install Dependencies

Install the dependencies for the React frontend and backend:

```bash
npm run install:all
```

### 3. Install and Set Up PostgreSQL

If you have not already installed PostgreSQL, follow the instructions on the [official website](https://www.postgresql.org/download/).

After installation, create the `social_platform` database:

```bash
psql -h localhost -U postgres -c "CREATE DATABASE social_platform;"
```

### 4. Set up the .env File

Prisma uses the .env file for environment variables. Create a .env file in the `server` directory and add your database connection string and AWS S3 credentials:

```plaintext
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/social_platform?schema=public"

AWS_ACCESS_KEY_ID="YOUR_AWS_ACCESS_KEY_ID"
AWS_SECRET_ACCESS_KEY="YOUR_AWS_SECRET_ACCESS_KEY"
AWS_REGION="YOUR_AWS_REGION"
AWS_S3_BUCKET_NAME="YOUR_S3_BUCKET_NAME"
```

Replace the placeholders with the appropriate values:

- YOUR_PASSWORD: The password for your PostgreSQL user.

- YOUR_AWS_ACCESS_KEY_ID and YOUR_AWS_SECRET_ACCESS_KEY: Your AWS access key ID and secret access key.

- YOUR_AWS_REGION: The AWS region where your S3 bucket is located.

- YOUR_S3_BUCKET_NAME: The name of your S3 bucket for file storage.

You will also need to create env variables for the authentication process

- To generate `JWT_SECRET` and `JWT_REFRESH_SECRET`, you can use the following commands in your terminal:

```bash
echo "JWT_SECRET=\"$(openssl rand -base64 64 | tr -d '\n')\"" >> .env
echo "JWT_REFRESH_SECRET=\"$(openssl rand -base64 64 | tr -d '\n')\"" >> .env
```

### 5. Run database migrations

Apply the database migrations by running:

```bash
(cd server && npx prisma migrate dev)
```

### 6. Seed the database (optional)

If you want to seed the database with initial data, run the following command from the root directory:

```bash
(cd server && npm run seed)
```

### 6. Running the Application

To run the frontend and backend:

```bash
npm run start
```
