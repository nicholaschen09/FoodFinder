require('dotenv').config();
const mongoose = require('mongoose');

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/analytics';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const orderSchema = new mongoose.Schema({
  query: String,
  result: String,
  location: {
    lat: Number,
    lng: Number
  },
  timestamp: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);

async function seedData() {
  try {
    // Clear existing data
    await Order.deleteMany({});
    
    // Define sample orders
    const sampleOrders = [
      {
        query: "I want a burger and fries",
        result: "Order confirmed: Burger with fries from Joe's Diner",
        location: { lat: 40.7128, lng: -74.0060 }
      },
      {
        query: "I want pizza",
        result: "Order confirmed: Pepperoni Pizza from Luigi's Pizzeria",
        location: { lat: 34.0522, lng: -118.2437 }
      },
      {
        query: "I need pasta",
        result: "Order confirmed: Spaghetti Carbonara from Bella Italia",
        location: { lat: 41.8781, lng: -87.6298 }
      }
    ];
    
    // Insert the sample orders into the database
    await Order.insertMany(sampleOrders);
    console.log('Seed data inserted successfully!');
    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
}

seedData();