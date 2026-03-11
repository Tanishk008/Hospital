const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const patientRoutes = require('./routes/patientRoutes');
const errorHandler = require('./middleware/errorHandler');

// Load env vars
dotenv.config();

const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Root route
app.get('/', (req, res) => {
    res.json({ message: 'Hospital Patient Management API is running 🏥' });
});

// Routes
app.use('/patients', patientRoutes);

// Handle unmatched routes (404)
app.use((req, res) => {
    res.status(404).json({ success: false, error: 'Route not found' });
});

// Error handling middleware (must be last)
app.use(errorHandler);

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log('✅ MongoDB connected successfully');
        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('❌ MongoDB connection failed:', err.message);
        process.exit(1);
    });
