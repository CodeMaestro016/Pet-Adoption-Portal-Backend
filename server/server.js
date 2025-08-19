require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Pet Adoption Backend is running');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});