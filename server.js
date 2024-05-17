import express, { json } from 'express';
import { connect } from 'mongoose';
import SystemRoutes from './routes/SystemRoutes.js';

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
connect('mongodb://localhost:27017/speedSense', {
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB:', err);
});

// Middleware
app.use(json()); // Parse JSON request bodies
app.use('/v1/api',SystemRoutes); // Route middleware

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
