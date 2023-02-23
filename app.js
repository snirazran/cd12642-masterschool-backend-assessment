const express = require('express');
const dotenv = require('dotenv').config();
const photoRouter = require('./routes/photoRoutes');
const port = process.env.PORT;

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the Unsplash API!' });
});

app.use('/api/photos', photoRouter);

app.listen(port, () => console.log(`Server started on port ${port}`));
