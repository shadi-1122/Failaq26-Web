require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const { GITHUB_TOKEN, REPO_OWNER, REPO_NAME, FILE_PATH } = process.env;

const headers = {
    Authorization: `token ${GITHUB_TOKEN}`,
    Accept: 'application/vnd.github.v3+json'
};

const githubApiUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`;
const githubRawUrl = `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/main/${FILE_PATH}`;

// To store the SHA required for updating file
let latestSha = '';

// Load users.json from GitHub (raw content)
app.get('/load-users', async (req, res) => {
    try {
        const response = await axios.get(githubRawUrl);
        res.json(response.data);
    } catch (err) {
        console.error('Error loading users:', err.message);
        res.status(500).json({ error: 'Could not load users' });
    }
});

// Save updated users.json to GitHub
app.post('/save-users', async (req, res) => {
    try {
        // Get current SHA
        const shaResponse = await axios.get(githubApiUrl, { headers });
        latestSha = shaResponse.data.sha;

        // Prepare updated content
        const updatedContent = Buffer.from(JSON.stringify(req.body, null, 2)).toString('base64');

        // Send PUT request to update file
        const updateResponse = await axios.put(githubApiUrl, {
            message: 'Update users.json from web editor',
            content: updatedContent,
            sha: latestSha
        }, { headers });

        latestSha = updateResponse.data.content.sha; // Update SHA for future use
        res.json({ success: true });
    } catch (err) {
        console.error('Error saving:', err.response?.data || err.message);
        res.status(500).json({ error: 'Could not save file.' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});
