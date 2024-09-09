const express = require('express');
require('dotenv').config();
const { errors } = require('celebrate');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const projectRoutes = require('./routes/projects');
const errorHandler = require('./middleware/errorHandler');
const logger = require('./config/Logger');

const app = express();
const port = process.env.PORT || 3033;

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/projects', projectRoutes);

// Celebrate error handler
app.use(errors());

// Custom error handler
app.use(errorHandler);
app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  logger.info(`Server running on port ${port}`);
});
