const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const Room = require('./models/Room');
const Booking = require('./models/Booking');
const Review = require('./models/Review');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

/* ========= ROOMS ========= */

// GET all rooms
app.get('/rooms', async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET room by ID
app.get('/rooms/:id', async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ error: 'Room not found' });
    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// CREATE a room
app.post('/rooms', async (req, res) => {
  try {
    const room = new Room(req.body);
    const savedRoom = await room.save();
    res.status(201).json(savedRoom);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/* ========= BOOKINGS ========= */

// CREATE a booking
app.post('/bookings', async (req, res) => {
  try {
    const booking = new Booking(req.body);
    const savedBooking = await booking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET bookings (optional query by email)
app.get('/bookings', async (req, res) => {
  try {
    const query = req.query.email ? { email: req.query.email } : {};
    const bookings = await Booking.find(query);
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE booking by ID
app.patch('/bookings/:id', async (req, res) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedBooking) return res.status(404).json({ error: 'Booking not found' });
    res.status(200).json(updatedBooking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE booking by ID
app.delete('/bookings/:id', async (req, res) => {
  try {
    const deletedBooking = await Booking.findByIdAndDelete(req.params.id);
    if (!deletedBooking) return res.status(404).json({ error: 'Booking not found' });
    res.status(200).json({ message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* ========= REVIEWS ========= */

// CREATE a review
app.post('/review', async (req, res) => {
  try {
    const review = new Review(req.body);
    const savedReview = await review.save();
    res.status(201).json(savedReview);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET all reviews
app.get('/review', async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* ========= ROOT ========= */
app.get('/', (req, res) => {
  res.status(200).send('SuiteVoyage Server Running');
});

/* ========= START SERVER ========= */
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
