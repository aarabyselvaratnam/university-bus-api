const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const routeRoutes = require('./routes/routeRoutes');
const busRoutes = require('./routes/busRoutes');
const scheduleRoutes = require('./routes/scheduleRoutes');

const app = express();

app.use(cors({
  origin: 'http://localhost:5173'
}));
app.use(express.json());

app.use('/api/routes', routeRoutes);
app.use('/api/buses', busRoutes);
app.use('/api/schedules', scheduleRoutes);

app.get('/', (req, res) => {
  res.json({
    message: 'University Bus Tracker API is running',
    endpoints: {
      routes: '/api/routes',
      buses: '/api/buses',
      schedules: '/api/schedules',
    },
  });
});

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });