const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/user.routes.js');
const app = express();
const path = require('path');

// middlewares
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, './dist')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './dist/index.html'));
});
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('MongoDB connected successfully!');
    app.listen(process.env.PORT || 5000, () => {
        console.log(`Server is running on port ${process.env.PORT || 5000}`);
      });
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

app.use('/api/user', userRoutes );
app.use('/api/doctor', require('./routes/doctor.routes.js'));
app.use('/api/department', require('./routes/department.routes.js'));

