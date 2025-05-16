const mongoose = require('mongoose');

// Optional: import the Message model if it's a separate schema
const MessageSchema = new mongoose.Schema({
  sender: { type: String, required: true },
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const queueMemberSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fullName: { type: String, required: true },
  visitReason: { type: String, required: true },
  priority: { type: String, enum: ['normal', 'emergency'], default: 'normal' },
  createdAt: { type: Date, default: Date.now }
});

const DepartmentSchema = new mongoose.Schema({
  departmentName: { type: String, required: true },
  tagLine: { type: String, required: true },
  averageWaitTime: { type: String, required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  queueMembers: [queueMemberSchema],
  groupChat: [MessageSchema],
  patientsTreated : { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true }
});

module.exports = mongoose.model('Department', DepartmentSchema);
