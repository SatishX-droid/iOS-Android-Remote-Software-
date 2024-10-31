// server.js
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Mock database for storing users (database.json)
const databaseFile = './database.json';

function readDatabase() {
    try {
        return JSON.parse(fs.readFileSync(databaseFile, 'utf8'));
    } catch (error) {
        console.error('Error reading database:', error);
        return { users: [], features: {} };
    }
}

function writeDatabase(data) {
    fs.writeFileSync(databaseFile, JSON.stringify(data, null, 2));
}

// User signup
app.post('/signup', (req, res) => {
    const { username, password } = req.body;
    let database = readDatabase();

    if (database.users.some(user => user.username === username)) {
        return res.status(400).json({ message: 'Username already exists' });
    }

    database.users.push({ username, password });
    writeDatabase(database);
    res.json({ message: 'Signup successful' });
});

// User login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const database = readDatabase();

    const user = database.users.find(user => user.username === username && user.password === password);
    if (user) {
        res.json({ message: 'Login successful' });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

// Toggle feature status
app.post('/toggleFeature', (req, res) => {
    const { feature } = req.body;
    let database = readDatabase();

    if (!database.features[feature]) {
        database.features[feature] = true;  // Enable feature if not set
    } else {
        database.features[feature] = !database.features[feature];  // Toggle feature
    }
    writeDatabase(database);

    res.json({ message: `${feature} toggled to ${database.features[feature] ? 'ON' : 'OFF'}` });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
                  
