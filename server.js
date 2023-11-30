const express = require('express');
const cors = require('cors');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const sequelize = require('./config/dbConfig');
const User = require('./models/userModels');

const app = express();
require('dotenv').config();

// Port Server
const PORT = process.env.PORT || 8080;

// Database Connection
async function initializeDatabase() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        // Synchronize models with the database
        await sequelize.sync({ force: true });
        console.log('Models have been synchronize successfully.')
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
initializeDatabase();

// Configuration
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Routes
require('./routes/authRoute')(app);
require('./routes/userRoute')(app);

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Neraca Application' });
});


// Listening PORT
app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});