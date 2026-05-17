require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const noteRoutes = require('./routes/noteRoutes');
const errorHandler = require('./middleware/errorMiddleware');

const app = express();
app.use(helmet());
app.use(cors({ origin: true }));
app.use(express.json({ limit: '2mb' }));

// connect DB
connectDB(process.env.MONGO_URI);

app.get('/', (req, res) => res.send('AI Notes Workspace API'));
app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);

// Public route to get shared note
app.get('/public/:publicId', require('./controllers/noteController').getPublic);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
