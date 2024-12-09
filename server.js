// Import express dan mysql
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');


// Inisialisasi express app
const app = express();


// Konfigurasi body-parser untuk parsing data dari form
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Konfigurasi koneksi ke database MySQL
const db = mysql.createConnection({
  host: 'localhost',         // ganti dengan host Anda jika perlu
  user: 'mahadika',              // ganti dengan username Anda
  password: 'janganangel',              // ganti dengan password Anda
  database: 'contact_form',   // nama database yang sudah dibuat
  port: 3306
});

// Menghubungkan ke database
db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to database.');
});

// Endpoint untuk menerima data dari formulir kontak
app.post('/send-message', (req, res) => {
  const { name, message } = req.body;

  if (!name || !message) {
    return res.status(400).send('Name and message are required.');
  }

  const query = 'INSERT INTO comments (name, message) VALUES (?, ?)';
  db.query(query, [name, message], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).send('Server error.');
    }
    res.status(200).send('Your message has been sent. Thank you!');
  });
});

app.get('/get-comments', (req, res) => {
    const query = 'SELECT name, message FROM comments';
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching data:', err);
        return res.status(500).send({ error: 'Server error.' });
      }
      res.status(200).json(results);
    });
});

// Menjalankan server pada port tertentu
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
