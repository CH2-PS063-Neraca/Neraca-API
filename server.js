const express = require('express');
const cors = require('cors');
const cookieSession = require('cookie-session');
const app = express();

require('dotenv').config();
const PORT = process.env.PORT || 8080;

// parse request of content-type - application/json
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Neraca Application' });
});

// Listening PORT
app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});