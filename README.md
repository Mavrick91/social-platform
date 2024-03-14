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

### 4. Run database migrations

Apply the database migrations by running:

```bash
npx prisma migrate dev
```

### 5. Set up the .env File

Prisma uses the .env file for environment variables. Create a .env file in the server/prisma directory and add your database connection string and AWS S3 credentials:

```plaintext
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/social_platform?schema=public"

JWT_SECRET="YOUR_GENERATED_JWT_SECRET"
JWT_REFRESH_SECRET="YOUR_GENERATED_JWT_REFRESH_SECRET"

AWS_ACCESS_KEY_ID="YOUR_AWS_ACCESS_KEY_ID"
AWS_SECRET_ACCESS_KEY="YOUR_AWS_SECRET_ACCESS_KEY"
AWS_REGION="YOUR_AWS_REGION"
AWS_S3_BUCKET_NAME="YOUR_S3_BUCKET_NAME"
```

Replace the placeholders with the appropriate values:

- YOUR_PASSWORD: The password for your PostgreSQL user.


- YOUR_GENERATED_JWT_SECRET and YOUR_GENERATED_JWT_REFRESH_SECRET: Generate these secrets using OpenSSL by running `openssl rand -base64 64` twice.


- YOUR_AWS_ACCESS_KEY_ID and YOUR_AWS_SECRET_ACCESS_KEY: Your AWS access key ID and secret access key.


- YOUR_AWS_REGION: The AWS region where your S3 bucket is located.


- YOUR_S3_BUCKET_NAME: The name of your S3 bucket for file storage.

### 6. Running the Application

To run the frontend and backend:

```bash
npm run start
```
