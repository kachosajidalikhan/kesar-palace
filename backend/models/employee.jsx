const mongoose = require('mongoose');

// Define the employee schema
const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String, // URL or path to the image
        required: false
    },
    facebook: {
        type: String,
        required: false
    },
    instagram: {
        type: String,
        required: false
    },
    twitter: {
        type: String,
        required: false
    },
    position: {
        type: String,
        required: true
    }
});

// Create the model from the schema
const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
