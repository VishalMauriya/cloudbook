const express = require("express");
const router = express.Router();
const Notes = require("../models/Notes");
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");

// Fetch all notes using API : GET "/api/notes/fetchAllNotes" Login required
router.get("/fetchAllNotes", fetchuser, async (req, res) => {
  const notes = await Notes.find({ user: req.user.id });
  res.send(notes);
});

// Create Note using API : POST "/api/notes/addNote" Login required
router.post(
  "/addNote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 charaters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const { title, description, tag } = req.body;

    // If there are errors, return BAD request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let note = await Notes.create({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Occured!");
    }
  }
);

// Update existing Note using API : PUT "/api/notes/updateNote" Login required
router.put("/updateNote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;

  //create a new Note object
  const newNote = {};
  if (title) {
    newNote.title = title;
  }
  if (description) {
    newNote.description = description;
  }
  if (tag) {
    newNote.tag = tag;
  }

  try {
    // find the note to be upated and update it
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found!");
    }

    //allows updation if user owns this note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed!");
    }

    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.send(note);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Occured!");
  }
});

// Delete Note using API : PUT "/api/notes/deleteNote" Login required
router.delete("/deleteNote/:id", fetchuser, async (req, res) => {
  try {
    // find the note to be deleted and delete it
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found!");
    }

    //allows deletion if user owns this note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed!");
    }

    note = await Notes.findByIdAndDelete(req.params.id);
    res.send("Successfully deleted note!");
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Occured!");
  }
});

module.exports = router;
