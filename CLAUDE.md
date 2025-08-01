# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

radiocalico is a Node.js web application built with Express.js and SQLite, designed as a local development server for website prototyping.

## Development Commands

### Starting the Application
```bash
npm install    # Install dependencies
npm start      # Start server on http://localhost:3000
npm run dev    # Same as npm start
```

### SQLite Database Access
If you need to access the SQLite database directly, use the locally installed SQLite binary:
```bash
export PATH=$HOME/local/bin:$PATH
sqlite3 database.db
```

## Architecture

### Technology Stack
- **Backend**: Express.js server with JSON middleware
- **Database**: SQLite with automatic table creation
- **Static Files**: Served from `public/` directory
- **Port**: 3000 (hardcoded)

### Database Schema
The application uses a single `users` table:
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

### API Endpoints
- `GET /` - Development status page with navigation links
- `GET /api/users` - Retrieve all users (JSON)
- `POST /api/users` - Create user (expects `{name, email}` in request body)
- `GET /test` - Database connectivity test (creates test user and returns all users)

### File Structure
- `server.js` - Main application server (single-file architecture)
- `database.db` - SQLite database file (auto-created)
- `public/` - Static files directory
- `package.json` - Standard Node.js project configuration

## Development Notes

### Database Initialization
The application automatically creates the `users` table on startup if it doesn't exist. The database connection includes graceful shutdown handling via SIGINT signal.

### Error Handling
Basic error responses are implemented for database operations. All SQL queries use parameterized statements to prevent SQL injection.

### Local SQLite Installation
SQLite3 is installed locally in `~/local/bin/sqlite3` (version 3.46.0) and needs to be added to PATH for direct database access.

### No Git Repository
This project is not currently initialized as a git repository.

### Missing Infrastructure
- No testing framework configured
- No linting or code formatting tools
- No environment configuration
- No authentication/authorization
- No API documentation or OpenAPI specs