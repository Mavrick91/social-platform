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

### 2. Install Frontend Dependencies

Navigate to the root of the project and install the dependencies for the React frontend:

```bash
bun install
```

### 3. Install and Set Up PostgreSQL

If you have not already installed PostgreSQL, follow the instructions on the [official website](https://www.postgresql.org/download/).

After installation, create the `social-platform` database:

```bash
psql -h localhost -U postgres -c "CREATE DATABASE social_platform;"
```

### 4. Configure the Backend

Navigate to the server directory and install the NestJS backend dependencies:

```bash
cd server
npm install
```

### 5. Initialize Prisma

Set up Prisma within the server directory:

```bash
npx prisma init
```

### 6. Set up the .env File

Prisma uses the `.env` file for environment variables. Create a `.env` file in the `server/prisma` directory and add your database connection string:

```plaintext
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/social_platform"
```

Replace `YOUR_PASSWORD` with the password for your PostgreSQL user.

### 7. Running the Application

To run the frontend:

```bash
# From the root of the project
bun run dev
```

To run the backend:

```bash
# Make sure you're in the server directory
npm run start:dev
```
