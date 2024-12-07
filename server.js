const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Database Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',       // Default MySQL username in XAMPP
    password: '',       // Default MySQL password in XAMPP (empty)
    database: 'comment_system', // Nama database Anda
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to MySQL database.');
});

// Routes

// Home Page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API untuk menambahkan komentar
app.post('/add-comment', (req, res) => {
    const { name, message } = req.body;

    // Pastikan data tidak kosong
    if (!name || !message) {
        return res.status(400).json({ success: false, message: 'Name and message are required.' });
    }

    // Query untuk menyimpan hanya name dan message
    const query = 'INSERT INTO comments (name, message) VALUES (?, ?)';
    db.query(query, [name, message], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ success: false, message: 'Failed to add comment' });
            return;
        }
        res.json({ success: true, message: 'Comment added successfully' });
    });
});

// API untuk mengambil semua komentar
app.get('/comments', (req, res) => {
    const query = 'SELECT name, message, created_at FROM comments ORDER BY created_at DESC';
    db.query(query, (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Failed to fetch comments' });
      }
      res.json(results);
    });
});

// Menjalankan server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});