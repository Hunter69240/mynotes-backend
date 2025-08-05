// Import required modules
const express = require('express'); // Web framework for handling HTTP requests
const mongoose = require('mongoose'); // MongoDB object modeling tool
const cors = require('cors'); // Middleware to enable Cross-Origin Resource Sharing
require('dotenv').config(); // ✅ Load environment variables from .env file

// Initialize Express app
const app = express();

// Middleware
app.use(cors()); // Allow requests from other origins (e.g., your React Native frontend)
app.use(express.json()); // Automatically parse JSON request bodies

// Import and use note routes (modular routing)
const noteRoutes = require('./routes/notes');
app.use('/api/notes', noteRoutes); // All routes in notes.js will be prefixed with /api/notes

// ✅ Get MongoDB connection URI from environment variables
const mongoURI = process.env.MONGO_URI;

// Connect to MongoDB using Mongoose
mongoose.connect(mongoURI, {
    useNewUrlParser: true,        // Use new URL parser
    useUnifiedTopology: true      // Use new server discovery engine
})
.then(() => {
    console.log('Connected to MongoDB');

    // Start the server only after successful DB connection
    app.listen(5000, () => {
        console.log('Server running on http://localhost:5000');
    });
})
.catch((err) => {
    console.error('MongoDB connection error:', err); // Log connection error
});
