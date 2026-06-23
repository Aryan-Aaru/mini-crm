require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const opportunityRoutes = require('./routes/opportunityRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// Connect to MongoDB Atlas
connectDB();

const app = express();

// ============ MIDDLEWARE ============
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ============ ROUTES ============
app.use('/api/auth', authRoutes);
app.use('/api/opportunities', opportunityRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Mini CRM API is running...' });
});

// ============ ERROR HANDLING ============
app.use(notFound);
app.use(errorHandler);

// ============ START SERVER ============
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});