const mongoose = require('mongoose');

// Define the structure of a Note
const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
}, { timestamps: true });

// Export the Note model
module.exports = mongoose.model('Note', noteSchema);
