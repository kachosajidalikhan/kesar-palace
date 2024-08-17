let mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    email:{ type: String, unique: true },
    userName:String,
    password:String,
    type:String,
    id:Number,
    confirmationCode: String,
    isConfirmed: { type: Boolean, default: false },
    resetToken: String,
    resetTokenExpiry: Date,
});

module.exports = mongoose.model('user', userSchema)