# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

radiocalico is an online radio station demo built with Express.js and SQLite. The main page features a radio player that streams lossless HLS audio directly in the browser.

**GitHub Repository**: https://github.com/ThomBator/radiocalico

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
- **Frontend**: HTML5 audio player with HLS.js library for streaming
- **Backend**: Express.js server with JSON middleware
- **Database**: SQLite with automatic table creation
- **Static Files**: Served from `public/` directory
- **Streaming**: HLS (HTTP Live Streaming) support with error recovery
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
- `GET /` - Main radio player interface (serves `public/index.html`)
- `GET /api/users` - Retrieve all users (JSON)
- `POST /api/users` - Create user (expects `{name, email}` in request body)
- `GET /test` - Database connectivity test (creates test user and returns all users)

### Radio Player Features
- **HLS Stream**: `https://d3d4yli4hf5bmh.cloudfront.net/hls/live.m3u8`
- **Browser Compatibility**: HLS.js for modern browsers, native Safari support
- **Audio Controls**: Play/pause button and volume slider
- **Status Updates**: Real-time stream status (loading, playing, error handling)
- **Error Recovery**: Automatic retry for network and media errors
- **Responsive Design**: Mobile-friendly interface

### File Structure
- `server.js` - Main application server (single-file architecture)
- `database.db` - SQLite database file (auto-created)
- `public/index.html` - Radio player interface (main page)
- `package.json` - Standard Node.js project configuration

## Development Notes

### Database Initialization
The application automatically creates the `users` table on startup if it doesn't exist. The database connection includes graceful shutdown handling via SIGINT signal.

### Error Handling
Basic error responses are implemented for database operations. All SQL queries use parameterized statements to prevent SQL injection.

### Local SQLite Installation
SQLite3 is installed locally in `~/local/bin/sqlite3` (version 3.46.0) and needs to be added to PATH for direct database access.

### Git Repository
This project is version controlled with Git and hosted on GitHub at https://github.com/ThomBator/radiocalico

### Missing Infrastructure
- No testing framework configured
- No linting or code formatting tools
- No environment configuration
- No authentication/authorization
- No API documentation or OpenAPI specs