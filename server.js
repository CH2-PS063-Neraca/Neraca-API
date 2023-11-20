const express = require('express');
const dbConnect = require('./config/dbConnect');
const authRouter = require('./routes/authRoute');
const cors = require('cors');
const app = express();

require('dotenv').config();
const PORT = process.env.PORT || 8080;

// Database Connection
dbConnect();



// Routes
app.use('/api/user', authRouter);

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Neraca Application' });
});

// Listening PORT
app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});