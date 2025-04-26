require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

// CORS FIX
const corsOptions = {
  origin: 'https://failaqportal.vercel.app', // Allow only your frontend
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
};
app.use(cors(corsOptions));

app.use(express.json());

const { GITHUB_TOKEN, REPO_OWNER, REPO_NAME, FILE_PATH } = process.env;
const headers = {
    Authorization: `token ${GITHUB_TOKEN}`,
    Accept: 'application/vnd.github.v3+json'
};

app.get('/load-users', async (req, res) => {
    try {
        const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`;
        const response = await axios.get(url, { headers });

        // Decode base64 content
        const content = Buffer.from(response.data.content, 'base64').toString('utf-8');
        const jsonContent = JSON.parse(content);

        res.json(jsonContent);
    } catch (err) {
        console.error('Error loading users:', err.response?.data || err.message);
        res.status(500).json({ error: 'Could not load users.' });
    }
});

// Route to save users
app.post('/save-users', async (req, res) => {
    try {
        const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`;

        // STEP 1: Get latest SHA
        const fileInfo = await axios.get(url, { headers });
        const latestSha = fileInfo.data.sha;

        // STEP 2: Prepare new content
        const contentEncoded = Buffer.from(JSON.stringify(req.body, null, 2)).toString('base64');

        // STEP 3: Update file on GitHub
        await axios.put(url, {
            message: 'Update users.json from web editor',
            content: contentEncoded,
            sha: latestSha
        }, { headers });

        res.json({ success: true });
    } catch (err) {
        console.error('Error saving users:', err.response?.data || err.message);
        res.status(500).json({ error: 'Could not save users.' });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
