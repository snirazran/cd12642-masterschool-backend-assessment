const express = require('express');
const dotenv = require('dotenv').config();
const photoRouter = require('./routes/photoRoutes');
const userRouter = require('./routes/userRoutes');
const { errorHandler } = require('./middleware/errorMiddleware');
const favoritephotoRouter = require('./routes/favoritesRoutes');
const connectDB = require('./config/db');
const port = process.env.PORT;

connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the Unsplash API!' });
});

app.use('/api/photos', photoRouter);
app.use('/api/users', userRouter);
app.use('/api/favoritephotos', favoritephotoRouter);
app.use(errorHandler);
app.listen(port, () => console.log(`Server started on port ${port}`));
