const mongoose = require('mongoose');

const checkoutSchema = mongoose.Schema({
    userName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: false
  },
  paymentStatus: {
    type: String,
    required: false
  },
  phoneNo: {
    type: Number,
    required: true
  },
  roomNo: {
    type: Number,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  paymentMethod: {
    type: String,
    enum: ['EasyPaisa', 'JazzCash', 'Bank'],
    default: 'Bank'
  },
  accountHolderName: {
    type: String,
    required: true
  },
  accountNumber: {
    type: Number,
    required: true
  },
  transactionSlip: {
    type: String,
    required: true
  },
  userCnic: {
    type: Number,
    required: true
  },
  NoOfStay: {
    type: Number,
    required: true
  },
  totalCost: {
    type: Number,
    required: true
  },
  roomName: {
    type: String,
    required: true
  },
  checkIn: {
    type: String,
    required: true
  },
  checkOut: {
    type: String,
    required: true
  },
  userId: {
    type: Number,
    required: true
  },
}, {
  timestamps: true 
});


module.exports = mongoose.model('Checkout', checkoutSchema)

