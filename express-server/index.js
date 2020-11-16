// Requires
require('dotenv').config(); // You can use this globally in app - process.env.<environment_var>
const express = require('express');
const cors = require('cors')
const { dbConnection } = require('./db/config'); //Destructuration

// Create express server
const app = express();

// Cors configuration (middleware)
app.use(cors());

// Parse request body (json)
app.use( express.json() );

// Database connection. See credentials in .env
dbConnection();

// Public directory (Serves an html page)
app.use( express.static('public') );

// Routes
app.use( '/api/login', require('./routes/auth') );
app.use( '/api/search', require('./routes/search') );
app.use( '/api/uploads', require('./routes/uploads') );
app.use( '/api/users', require('./routes/users') );
app.use( '/api/hospitals', require('./routes/hospitals') );
app.use( '/api/doctors', require('./routes/doctors') );

// Start
app.listen( process.env.PORT, () => {
    console.log("Server running on port " + process.env.PORT);
});