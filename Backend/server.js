const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db'); // ← this MUST match

const Room = require('./models/Room');
const Booking = require('./models/Booking');
const Review = require('./models/Review');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// 🔥 THIS MUST BE A FUNCTION
connectDB();

/* ========= ROOMS ========= */
app.get('/rooms', async (req, res) => {
  const rooms = await Room.find();
  res.send(rooms);
});

app.get('/rooms/:id', async (req, res) => {
  const room = await Room.findById(req.params.id);
  res.send(room);
});

/* ========= BOOKINGS ========= */
app.post('/bookings', async (req, res) => {
  const booking = new Booking(req.body);
  const result = await booking.save();
  res.send(result);
});

app.get('/bookings', async (req, res) => {
  const query = req.query.email ? { email: req.query.email } : {};
  const bookings = await Booking.find(query);
  res.send(bookings);
});

app.patch('/bookings/:id', async (req, res) => {
  const result = await Booking.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.send(result);
});

app.delete('/bookings/:id', async (req, res) => {
  const result = await Booking.findByIdAndDelete(req.params.id);
  res.send(result);
});

/* ========= REVIEWS ========= */
app.post('/review', async (req, res) => {
  const review = new Review(req.body);
  const result = await review.save();
  res.send(result);
});

app.get('/review', async (req, res) => {
  const reviews = await Review.find();
  res.send(reviews);
});

/* ========= ROOT ========= */
app.get('/', (req, res) => {
  res.send('SuiteVoyage Server Running');
});

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
