const express = require('express');
const app = express();

app.use(express.json());

let users = [];

app.get('/users', (req, res) => {
    res.json(users);
});

app.post('/users', (req, res) => {
    const user = req.body;
    users.push(user);
    res.json({ message: "User added", user });
});

app.listen(3000, () => {
    console.log("User service running on port 3000");
});