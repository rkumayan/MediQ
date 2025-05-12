const Room = require('../models/Room.model');
const express = require('express');
const router = express.Router();

router.get('/getRoom/:roomId', async (req, res) => {
  try {    
    const roomId = req.params.roomId;
    const room  = await Room.findById(roomId);
    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching room details' });
  }
});
router.post( '/createRoom', async (req, res) => {
  try {
    const { roomName, owner } = req.body;
    const newRoom = new Room({ roomName, owner });
    await newRoom.save();
    res.status(201).json(newRoom);
  } catch (error) {
    res.status(500).json({ message: 'Error creating room' });
  }
});

// add endpoint to push messages to room
router.post('/addMessage/:roomId', async (req, res) => {
  try {
    const roomId = req.params.roomId;
    const { sender , text } = req.body;
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ ok : 'false' , message: 'Room not found' });
    }
    room.groupChat.push({ sender, text  });
    await room.save();
    res.status(201).json({ ok : 'true' , message: 'Message added successfully' });
  } catch (error) {
    res.status(500).json({ ok : 'false' , message: 'Error adding message' });
  }
});

module.exports = router;
