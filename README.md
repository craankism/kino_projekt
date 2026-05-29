# Cinema Management System

A full-stack web application for managing cinema theaters, halls, and movie schedules.

## Tech Stack

**Backend:**

- Java 17
- Spring Boot 4.0
- Maven

**Frontend:**

- React 19
- TypeScript
- Material-UI
- Vite
- Zustand (State Management)
- React Router

## Features

- Manage multiple cinema locations
- Configure cinema halls with seating arrangements
- Add and organize movie listings
- Support for different movie versions (2D, 3D, 5D, etc.)
- RESTful API architecture

## Getting Started

### Prerequisites

- Java 17 or higher
- Node.js and npm
- Maven

### Backend Setup

```bash
cd backend
./mvnw spring-boot:run
```

The backend server will start on `http://localhost:8080`

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend application will start on `http://localhost:5173`

## API Endpoints

- `/api/cinemas` - Cinema management
- `/api/halls` - Hall management
- `/api/movies` - Movie management

## Project Structure

```
├── backend/       # Spring Boot REST API
└── frontend/      # React TypeScript application
```

## License

This project is available for educational purposes.
