const axios = require('axios');
const express = require('express');
const { Client } = require('pg'); 
const app = express();

app.use(express.json());

// Connexion PostgreSQL
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'todo',
    password: 'pass',
    port: 5432,
});

client.connect();

// Création table
client.query(`
CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    title TEXT
);
`);

// Route test
app.get('/', (req, res) => {
    res.send("Task service is running 🚀");
});

// Ajouter une tâche (BDD)
app.post('/tasks', async (req, res) => {
    const { title } = req.body;

    const result = await client.query(
        'INSERT INTO tasks (title) VALUES ($1) RETURNING *',
        [title]
    );

    res.json(result.rows[0]);
});

// Voir les tâches (BDD)
app.get('/tasks', async (req, res) => {
    const result = await client.query('SELECT * FROM tasks');
    res.json(result.rows);
});

// Communication entre services
app.get('/tasks-with-users', async (req, res) => {
    try {
        const users = await axios.get('http://user-service/users');
        res.json(users.data);
    } catch (error) {
        res.status(500).json({ error: "Erreur communication user-service" });
    }
});

// Lancement serveur
app.listen(4000, () => {
    console.log("Task service running on port 4000");
});