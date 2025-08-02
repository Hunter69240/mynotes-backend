const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // ✅ Load .env variables

const app = express();

app.use(cors());
app.use(express.json());

const noteRoutes = require('./routes/notes');
app.use('/api/notes', noteRoutes);

// ✅ Get Mongo URI from environment variables
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, {
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
