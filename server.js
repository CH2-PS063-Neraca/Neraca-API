const express = require('express');
const cors = require('cors');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const sequelize = require('./config/dbConfig');

// Models
const User = require('./models/userModels');
const Advokat = require('./models/advokatModels');
const firmLaw = require('./models/lawFirmModels');

const app = express();
require('dotenv').config();

// Port Server
const PORT = process.env.PORT || 3030;

// Body Parser 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());



// Routes User
require('./routes/authRoute')(app);
require('./routes/userRoute')(app);

// Router Advocat
require('./routes/advocatAuthRoute')(app);
require('./routes/advocatUserRoute')(app);

// Router Law Firm
require('./routes/lawfirmRoute')(app);

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Neraca Application' });
});


// Listening PORT
app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});