
let mongoose = require('mongoose');

let roomSchema = mongoose.Schema({
    roomName: String,
    roomType: String,
    roomPrice: Number,
    roomImage: [String],
    roomDescription: String,
    roomFacilities: String,
    roomRating: Number,
    roomNo: Number,
    id:Number,
    roomStatus: String,
    currentBookings: [
        {
          checkIn: { type: Date, required: true },
          checkOut: { type: Date, required: true },
          userId: Number
        }
      ]
},{
    timestamps: true
})

module.exports = mongoose.model('Rooms', roomSchema)