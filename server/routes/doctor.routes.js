const Department = require('../models/Department.model.js');
const Doctor = require('../models/Doctor.model.js');
const express = require('express');
const router = express.Router();

// VALIDATE THE DOCTOR
router.post('/validateDoctor', async (req, res) => {
  try {
    const { email, password } = req.body;

    const doctor = await Doctor.findOne({ email, password });
    if (doctor) {
      res.status(200).json({ ok : 'true' , message: 'Doctor validated successfully' , doctor });
    } else {
      res.status(401).json({ ok : 'false', message: 'Invalid email or password' });
    }
  } catch (error) {
    console.log('Error validating doctor:', error);
    res.status(500).json({ ok : 'false' , message: 'Error fetching doctors' });
  }
});

// ADD A NEW DOCTOR TO DATABASE
router.post( '/addDoctor', async (req, res) => {
  try {
    const { firstName, lastName, email , password, specialization } = req.body;
    const newDoctor = new Doctor({ firstName, lastName, email , password, specialization });
    await newDoctor.save();
    res.status(201).json( { ok : 'true' , message: 'Doctor added successfully', doctor: newDoctor });
  } catch (error) {
    console.error('Error adding doctor:', error);
    res.status(500).json({ ok : 'false' , message: 'Error adding user' });
  }
});

// GET DEPARTMENT ID OF DOCTOR
router.post('/getDepartmentId', async (req, res) => {
  try {
    const { doctorId } = req.body;
    const department = await Department.findOne({ doctor: doctorId });
    if (department) {
      
      res.status(200).json({ ok: 'true', departmentId: department._id });
    } else {
      res.status(404).json({ ok: 'false', message: 'Doctor not found' });
    }
  } catch (error) {
    console.error('Error fetching department ID:', error);
    res.status(500).json({ ok: 'false', message: 'Error fetching department ID' });
  }
});

module.exports = router;