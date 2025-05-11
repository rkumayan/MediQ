const mongoose = require('mongoose');

// Define a sub-schema for notifications
const notificationSchema = new mongoose.Schema({
    message: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    read: {
      type: Boolean,
      default: false,
    },
  });

const userSchema = new mongoose.Schema({
   
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    notifications: [notificationSchema], // Array of notifications
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  
  // Export the model
  module.exports = mongoose.model('User', userSchema);