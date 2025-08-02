// Step 1: Import necessary packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Step 2: Create an Express app
const app = express();

// Step 3: Middlewares (things that run before every request)
app.use(cors()); // Allow frontend to access backend
app.use(express.json()); // Parse JSON request body

// Step 4: Routes
const noteRoutes = require('./routes/notes'); // Import note routes
app.use('/api/notes', noteRoutes); // All routes starting with /api/notes

// Step 5: Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
    app.listen(5000, () => {
        console.log('Server running on http://localhost:5000');
    });
}).catch((err) => {
    console.error('MongoDB connection error:', err);
});
