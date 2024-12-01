const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // For handling CORS
const requestRoutes = require('./routes/requestRoutes'); // Import the request routes
const userRoutes = require('./routes/userRoutes'); // Import the user routes

const app = express();
const PORT = 5000;

app.use(cors()); // Enable CORS
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/requestsDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
   // Optional for unique indexes
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Use the request routes for request-related API endpoints
app.use('/api/requests', requestRoutes);

// Use the user routes for user-related API endpoints
app.use('/api/users', userRoutes); // New user-related route

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
