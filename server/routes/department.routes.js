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

// Endpoint to create a new department
router.post( '/createDepartment', async (req, res) => {
  try {
    const { departmentName, doctor, queueMembers , tagLine , averageWaitTime} = req.body;
    const newDepartment = new Department({ departmentName, doctor, queueMembers , tagLine , averageWaitTime });
    await newDepartment.save();
    res.status(201).json({ ok: 'true', message: 'Department created successfully', department: newDepartment });
  } catch (error) {
    console.log( "error creating department" , error);
    res.status(500).json({ ok: 'false',  message: 'Error creating department' });
  }
});

// Endpoint to join a department for a queue member
router.post('/joinDepartment', async (req, res) => {
  try {
    const { departmentId , userId , fullName , visitReason , priority } = req.body;
    const department = await Department.findById(departmentId);
    if (!department) {
      return res.status(404).json({ ok : 'false' , message: 'Department not found' });
    }
    // Check if the user is already a queue member
    const isMember = department.queueMembers.some(member => member.userId.toString() === userId);
    if (isMember) {
      return res.status(400).json({ ok : 'false' , message: 'User is already a member of the queue' });
    }
    department.queueMembers.push({ userId , fullName , visitReason , priority });
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
    let found = false;
    department.queueMembers = department.queueMembers.filter(member => {
      if( member.userId.toString() == userId.toString())
          found = true;
      // Check if the userId is not equal to the id in the queueMembers array
      return member.userId.toString() != userId.toString();      
    });
    if (!found) {
      return res.status(400).json({ ok : 'false' , message: 'User is not a member of the queue' });
    }
    await department.save();
    
    res.status(200).json({ ok : 'true' , message: 'Left department successfully' });
  } catch (error) {
    res.status(500).json({ ok : 'false' , message: 'Error leaving department' });
  }
});

// Endpoint to push messages to department
router.post('/addMessage/:departmentId', async (req, res) => {
  try {
    const departmentId = req.params.departmentId;
    const { sender , text , senderType } = req.body;
    const department = await Department.findById(departmentId);
    if (!department) {
      return res.status(404).json({ ok : 'false' , message: 'Department not found' });
    }
    department.groupChat.push({ sender, text , senderType });
    await department.save();
    res.status(201).json({ ok : 'true' , message: 'Message added successfully' });
  } catch (error) {
    console.log( "error adding message" , error);
    res.status(500).json({ ok : 'false' , message: 'Error adding message' });
  }
});

module.exports = router;
