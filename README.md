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
git clone https://github.com/yourusername/social-platform.git
cd social-platform
```

### 2. Install Dependencies

Install the dependencies for the React frontend and backend:

```bash
npm run install:all
```

### 3. Install and Set Up PostgreSQL

If you have not already installed PostgreSQL, follow the instructions on the [official website](https://www.postgresql.org/download/).

After installation, create the `social-platform` database:

```bash
psql -h localhost -U postgres -c "CREATE DATABASE social-platform;"
```

### 4. Initialize Prisma

Set up Prisma within the server directory:

```bash
npx prisma init
```

### 5. Set up the .env File

Prisma uses the `.env` file for environment variables. Create a `.env` file in the `server/prisma` directory and add your database connection string:

```plaintext
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/social_platform"
```

Replace `YOUR_PASSWORD` with the password for your PostgreSQL user.

### 6. Running the Application

To run the frontend and backend:

```bash
npm run start
```
