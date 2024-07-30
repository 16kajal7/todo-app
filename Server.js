const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/ToDoRoute'); // Import your routes
require('dotenv').config(); // Load environment variables
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URL, {useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 3000000 // Increase timeout duration
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('MongoDB connection error:', err));

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

// Debugging: Log the type of 'routes'
console.log('Type of routes:', typeof routes); // Should log 'object'

// Use the imported router
app.use(routes); // Prefix all routes from ToDoRoute with '/api'

// Start the server
app.listen(PORT, () => console.log(`Listening on: ${PORT}`));
