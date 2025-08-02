const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { MONGO_URI } = require('./Secrets'); // ✅ Load from Secrets.js

const app = express();

app.use(cors());
app.use(express.json());

const noteRoutes = require('./routes/notes');
app.use('/api/notes', noteRoutes);

mongoose.connect(MONGO_URI, {
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
