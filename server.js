const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database');
    
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
  }
});

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head><title>Local Development Server</title></head>
      <body>
        <h1>🚀 Development Server Running!</h1>
        <p>Express.js server with SQLite database is ready</p>
        <ul>
          <li><a href="/api/users">View Users API</a></li>
          <li><a href="/test">Database Test</a></li>
        </ul>
      </body>
    </html>
  `);
});

app.get('/api/users', (req, res) => {
  db.all('SELECT * FROM users', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ users: rows });
  });
});

app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  db.run('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id: this.lastID, name, email });
  });
});

app.get('/test', (req, res) => {
  db.run('INSERT OR IGNORE INTO users (name, email) VALUES (?, ?)', ['Test User', 'test@example.com'], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    db.all('SELECT * FROM users', [], (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ 
        message: 'Database test successful!', 
        users: rows,
        totalUsers: rows.length 
      });
    });
  });
});

app.listen(port, () => {
  console.log(`🌐 Server running at http://localhost:${port}`);
  console.log(`💾 SQLite database: ./database.db`);
});

process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Database connection closed.');
    process.exit(0);
  });
});