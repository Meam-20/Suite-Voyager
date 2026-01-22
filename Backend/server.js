const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Models
const Room = require('./models/Room');
const Booking = require('./models/Booking');
const Review = require('./models/Review');
const User = require('./models/User'); // Notun User Model

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

/* ========= USERS & ROLE MANAGEMENT (NEW) ========= */

// 1. POST: User Save kora (Login er shomoy call hobe)
app.post('/users', async (req, res) => {
  try {
    const user = req.body;
    // Check kora hocche user agei database-e ache kina
    const query = { email: user.email };
    const existingUser = await User.findOne(query);

    if (existingUser) {
      return res.send({ message: 'User already exists', insertedId: null });
    }

    const newUser = new User(user);
    const result = await newUser.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// 4. PATCH: Make User Admin
app.patch('/users/admin/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { role: 'admin' },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 2. GET: Admin Check (Email diye check kora hobe user admin kina)
app.get('/users/admin/:email', async (req, res) => {
  try {
    const email = req.params.email;
    const user = await User.findOne({ email });
    let isAdmin = false;
    if (user) {
      isAdmin = user.role === 'admin';
    }
    res.send({ isAdmin });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. GET: All Users (Admin Dashboard er jonno)
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* ========= ROOMS (FULL CRUD) ========= */

app.get('/rooms', async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/rooms/:id', async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ error: 'Room not found' });
    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/rooms', async (req, res) => {
  try {
    const room = new Room(req.body);
    const savedRoom = await room.save();
    res.status(201).json(savedRoom);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.patch('/rooms/:id', async (req, res) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedRoom);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/rooms/:id', async (req, res) => {
  try {
    await Room.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Room deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* ========= BOOKINGS (FULL CRUD) ========= */

app.post('/bookings', async (req, res) => {
  try {
    const booking = new Booking(req.body);
    const savedBooking = await booking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/bookings', async (req, res) => {
  try {
    const query = req.query.email ? { email: req.query.email } : {};
    const bookings = await Booking.find(query);
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/bookings/:id', async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Booking deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* ========= REVIEWS ========= */

app.post('/review', async (req, res) => {
  try {
    const review = new Review(req.body);
    const savedReview = await review.save();
    res.status(201).json(savedReview);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/review', async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* ========= ROOT & START ========= */
app.get('/', (req, res) => {
  res.status(200).send('SuiteVoyage Server Running with Admin Role Implementation');
});

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});