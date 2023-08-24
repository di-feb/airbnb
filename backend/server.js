const express = require('express');
const app = express();
const cors = require('cors'); // Add this if you need CORS support
const listingRoutes = require('./routes/listings');

app.use(express.json());
app.use(cors()); // Use CORS middleware if needed

app.use('/api', listingRoutes); // Use your API routes

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});