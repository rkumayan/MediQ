const Department = require('../models/Department.model.js');
const express = require('express');
const router = express.Router();

// Endpoint to get all departments
router.get('/getDepartments', async (req, res) => {
  try {
    const departments = await Department.find();
    res.status(200).json({ ok: 'true' , departments });
  } catch (error) {
    res.status(500).json({ ok: 'false', message: 'Error fetching departments' });
  }
});


// Endpoint to get a specific department by ID
router.get('/getDepartment/:departmentId', async (req, res) => {
  try {
    const departmentId = req.params.departmentId;
    const department = await Department.findById(departmentId);
    res.status(200).json( { ok: 'true' , department });
  } catch (error) {
    res.status(500).json({ ok: 'false', message: 'Error fetching department details' });
  }
});
router.post( '/createDepartment', async (req, res) => {
  try {
    const { departmentName, doctor, queueMembers , tagLine } = req.body;
    const newDepartment = new Department({ departmentName, doctor, queueMembers , tagLine });
    await newDepartment.save();
    res.status(201).json({ ok: 'true', message: 'Department created successfully', department: newDepartment });
  } catch (error) {
    console.log( "error creating department" , error);
    res.status(500).json({ ok: 'false',  message: 'Error creating department' });
  }
});

// add endpoint to push messages to department
router.post('/addMessage/:departmentId', async (req, res) => {
  try {
    const departmentId = req.params.departmentId;
    const { sender , text } = req.body;
    const department = await Department.findById(departmentId);
    if (!department) {
      return res.status(404).json({ ok : 'false' , message: 'Department not found' });
    }
    department.groupChat.push({ sender, text});
    await department.save();
    res.status(201).json({ ok : 'true' , message: 'Message added successfully' });
  } catch (error) {
    res.status(500).json({ ok : 'false' , message: 'Error adding message' });
  }
});
// Endpoint to join a department for a queue member
router.post('/joinDepartment', async (req, res) => {
  try {
    const { departmentId , userId } = req.body;    
    const department = await Department.findById(departmentId);
    if (!department) {
      return res.status(404).json({ ok : 'false' , message: 'Department not found' });
    }
    department.queueMembers.push(userId);
    await department.save();
    res.status(200).json({ ok : 'true' , message: 'Joined department successfully' });
  } catch (error) {
    res.status(500).json({ ok : 'false' , message: 'Error joining department' });
  }
});

// Endpoint to leave a department for a queue member
router.post('/leaveDepartment', async (req, res) => {
  try {
    const { departmentId , userId } = req.body;
    const department = await Department.findById(departmentId);
    if (!department) {
      return res.status(404).json({ ok : 'false' , message: 'Department not found' });
    }
    department.queueMembers = department.queueMembers.filter(id => id.toString() !== userId);
    await department.save();
    res.status(200).json({ ok : 'true' , message: 'Left department successfully' });
  } catch (error) {
    res.status(500).json({ ok : 'false' , message: 'Error leaving department' });
  }
});

module.exports = router;
