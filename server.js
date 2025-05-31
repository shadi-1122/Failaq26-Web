const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const USERS_FILE = path.join(__dirname, 'users.json');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Helper: read users.json
function readUsers() {
  const data = fs.readFileSync(USERS_FILE, 'utf8');
  return JSON.parse(data);
}

// Helper: write users.json
function writeUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf8');
}

// Get all users
app.get('/api/users', (req, res) => {
  try {
    const users = readUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to read users' });
  }
});

// Add new user
app.post('/api/users', (req, res) => {
  try {
    const users = readUsers();
    const newUser = req.body;

    if (!newUser.Name || newUser.Name.trim() === '') {
      return res.status(400).json({ error: 'Name is required' });
    }

    // Generate a new unique ID (simple increment)
    const maxId = users.reduce((max, u) => Math.max(max, Number(u.id)), 0);
    newUser.id = String(maxId + 1);

    users.push(newUser);
    writeUsers(users);

    res.json(newUser);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add user' });
  }
});

// Update user
app.put('/api/users/:id', (req, res) => {
  try {
    const users = readUsers();
    const id = req.params.id;
    const updatedUser = req.body;

    if (!updatedUser.Name || updatedUser.Name.trim() === '') {
      return res.status(400).json({ error: 'Name is required' });
    }

    const index = users.findIndex(u => u.id === id);
    if (index === -1) {
      return res.status(404).json({ error: 'User not found' });
    }

    users[index] = { ...users[index], ...updatedUser, id }; // keep ID
    writeUsers(users);
    res.json(users[index]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// Delete user
app.delete('/api/users/:id', (req, res) => {
  try {
    const users = readUsers();
    const id = req.params.id;
    const index = users.findIndex(u => u.id === id);
    if (index === -1) {
      return res.status(404).json({ error: 'User not found' });
    }
    users.splice(index, 1);
    writeUsers(users);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
