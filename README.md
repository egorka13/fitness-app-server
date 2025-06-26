A RESTful API server for managing fitness tracking data, built with Node.js and Fastify.

## Features

- User authentication and registration
- Workout and exercise tracking
- Progress monitoring and analytics
- Secure REST API endpoints

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn

### Installation

```bash
git clone https://github.com/egorka13/fitness-app-server.git
cd fitness-app-server
npm install
```

### Configuration

Create a `.env` file in the root directory and set the following variables:

```
PORT=8000
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:3000
DATABASE_URL=...
SUPABASE_JWT=...
```

### Running the Server

```bash
npm start
```

The server will run on `http://localhost:8000`.

## API Endpoints

| Method | Endpoint                   | Description                              |
| ------ | -------------------------- | ---------------------------------------- |
| GET    | /api/exercises             | List all exercises                       |
| GET    | /api/exercises/:id         | Get exercise by ID                       |
| POST   | /api/exercises             | Create a new exercise                    |
| GET    | /api/exercises/:id/history | List all sets for a specific exercise    |
| POST   | /api/exercises/:id/history | Create a new set for a specific exercise |

## Folder Structure

```
/src
    /controllers
    /db
    /models
    /repositories
    /routes
    /services
```
