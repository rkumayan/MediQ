const User = require('../models/User.model');
const express = require('express');
const router = express.Router();

router.get('/getUser', async (req, res) => {
  try {
    return res.status(200).json({ message: 'Welcome to the user API!' });
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
});
router.post( '/addUser', async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;
    const newUser = new User({ firstName, lastName, email });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Error adding user' });
  }
});

module.exports = router;