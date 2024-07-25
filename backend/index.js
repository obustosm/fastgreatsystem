const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');


// Configuración de CORS
app.use(cors());
// Uso de Body Parser
app.use(bodyParser.json());

// Configuración de la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'fastgreatsystem_user',
  password: 'C4ntr1s2ñ1',
  database: 'fastgreatsystem_db'
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

// Ruta para la raíz
app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

// Ruta para obtener items
app.get('/items', (req, res) => {
  const sql = 'SELECT * FROM items';
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).send('Error fetching data from database');
      return;
    }
    res.json(results);
  });
});

//Ruta para añadir Items
app.post('/items', (req, res) => {
  const { name, description, quantity } = req.body;
  const sql = 'INSERT INTO items (name, description, quantity) VALUES (?, ?, ?)';
  db.query(sql, [name, description, quantity], (err, result) => {
    if (err) {
      res.status(500).send('Error inserting data into database');
      return;
    }
    res.status(201).json({ id: result.insertId, name, description, quantity });
  });
});

// Ruta para obtener un solo item por ID
app.get('/items/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM items WHERE id = ?';
  db.query(sql, [id], (err, results) => {
    if (err) {
      res.status(500).send('Error fetching data from database');
      return;
    }
    res.json(results[0]);
  });
});

// Ruta para actualizar un item
app.put('/items/:id', (req, res) => {
  const { id } = req.params;
  const { name, description, quantity } = req.body;
  const sql = 'UPDATE items SET name = ?, description = ?, quantity = ? WHERE id = ?';
  db.query(sql, [name, description, quantity, id], (err, result) => {
    if (err) {
      res.status(500).send('Error updating data in database');
      return;
    }
    res.json({ id, name, description, quantity });
  });
});

// Ruta para eliminar un item
app.delete('/items/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM items WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      res.status(500).send('Error deleting data from database');
      return;
    }
    res.status(204).send();
  });
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
