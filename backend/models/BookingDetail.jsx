
let mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true
  },
  roomName: {
    type: String,
    required: true
  },
  roomPrice: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true,
  },
  checkIn: {
    type: String,
    required: true
  },
  checkOut: {
    type: String,
    required: true
  },
  adults: {
    type: Number,
    required: true,
  },
  children: {
    type: Number,
    default: 0
  },
  specialRequests: {
    type: String,
    maxlength: 500
  },
  numberOfDays: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  roomNo: {
    type: Number,
    required: true,
  },
  phoneNo: {
    type: Number,
    required: true,
  },
  cnic: {
    type: Number,
    required: true,
  },
  userId: { 
    type:Number, 
    required: true },
}, {
  timestamps: true
});

module.exports = mongoose.model('BookingDetail', bookingSchema)
