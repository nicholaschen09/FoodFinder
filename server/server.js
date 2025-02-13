require('dotenv').config();

const googleKey = process.env.GOOGLE_API_KEY;
const openaiKey = process.env.OPENAI_API_KEY;

const express = require('express');
const fetch = require('node-fetch');
const mongoose = require('mongoose');

// Connect to MongoDB using Mongoose without deprecated options
mongoose.connect(process.env.DATABASE_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('../public'));

// ... remaining endpoints and server code ...

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
