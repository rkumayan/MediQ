const User = require('../models/User.model');
const express = require('express');
const router = express.Router();

router.post('/validateUser', async (req, res) => {
  try {
    const { email, password } = req.body;

    
    const user = await User.findOne({ email, password });
    if (user) {
      res.status(200).json({ ok : 'true' , message: 'User validated successfully' , user });
    } else {
      res.status(401).json({ ok : 'false', message: 'Invalid email or password' });
    }
  } catch (error) {
    console.log('Error validating user:', error);
    res.status(500).json({ ok : 'false' , message: 'Error fetching users' });
  }
});
router.post( '/addUser', async (req, res) => {
  try {
    const { firstName, lastName, email , password } = req.body;
    const newUser = new User({ firstName, lastName, email , password });
    await newUser.save();
    res.status(201).json( { ok : 'true' , message: 'User added successfully', user: newUser });
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ ok : 'false' , message: 'Error adding user' });
  }
});

module.exports = router;