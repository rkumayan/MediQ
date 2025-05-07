const mongoose = require('mongoose');



// Optional: import the Message model if it's a separate schema
const MessageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const RoomSchema = new mongoose.Schema({
  roomName: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  customers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  groupChat: [MessageSchema],
  createdAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true }
});

module.exports = mongoose.model('Room', RoomSchema);
