const express = require('express');
const router = express.Router(); // Create a new router instance
const Note = require('../models/Note'); // Import the Note Mongoose model

// ===================================================
// 1. GET all notes - returns notes sorted by newest first
// ===================================================
router.get('/', async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 }); // -1 = descending order
    res.json(notes); // Send notes as JSON response
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch notes' }); // Server error
  }
});

// ===================================================
// 2. POST a new note - saves title and content
// ===================================================
router.post('/', async (req, res) => {
  try {
    const { title, content } = req.body; // Extract data from request body
    const newNote = new Note({ title, content }); // Create new Note instance
    await newNote.save(); // Save to MongoDB
    res.json(newNote); // Return saved note
  } catch (err) {
    res.status(500).json({ error: 'Failed to save note' }); // Server error
  }
});

// ===================================================
// 3. DELETE a note by ID
// ===================================================
router.delete('/:id', async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id); // Delete note by Mongo ID
    res.json({ message: 'Note deleted' }); // Confirmation message
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete note' }); // Server error
  }
});

// ===================================================
// 4. PUT (update) a note by ID
// ===================================================
router.put('/:id', async (req, res) => {
  try {
    const { title, content } = req.body; // Extract updated values

    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,       // Find note by ID
      { title, content },  // Update data
      { new: true }        // Return the updated note instead of old one
    );

    if (!updatedNote) {
      return res.status(404).json({ error: 'Note not found' }); // Not found
    }

    res.json(updatedNote); // Return updated note
  } catch (err) {
    res.status(500).json({ error: 'Failed to update note' }); // Server error
  }
});

module.exports = router; // Export the router to be used in main server file
