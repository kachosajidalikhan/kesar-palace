const jwt = require('jsonwebtoken');
const express = require("express");
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const path = require('path');
const multer = require('multer');
const { log } = require('console');
require('dotenv').config();


const app = express();

app.use(express.json());
app.use(bodyParser.json());

const  mongoose = require('mongoose');
// const roomsRoutes = require('./backend/roomRoutes/roomRoutes.js');
const User = require('./models/user.jsx')
const Rooms = require('./models/rooms.jsx')
const BookingDetail = require('./models/BookingDetail.jsx');
const Review = require('./models/review.jsx');
const CheckOutDetail =require('./models/CheckOutDetail.jsx');
const Employee = require('./models/employee.jsx');
const cors = require('cors');
app.use(cors());


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Use environment variable for the port
const port = process.env.PORT;
app.listen(port, () => console.log(`Node Server Started on ${port}`));



app.post('/create-user', async (req, res) => {
  const { userName,id, email,type, password } = req.body;
  
  // Generate a confirmation code
  const confirmationCode = Math.floor(100000 + Math.random() * 900000).toString();

  // Create user with the confirmation code
  const newUser = new User({ userName, email, password,id,type, confirmationCode, isConfirmed: false });
  await newUser.save();

  // Send email with confirmation code
  const mailOptions = {
    from: 'onlyforapp007@gmail.com',
    to: email,
    subject: 'Email Confirmation',
    text: `Your confirmation code is ${confirmationCode}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send({ message: 'Error sending email', error });
    }
    res.status(200).send({ message: 'Confirmation code sent to email' });
  });
});



// Forgot Password Route
app.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'No user with that email found' });
    }

    const token = crypto.randomBytes(20).toString('hex');
    user.resetToken = token;
    user.resetTokenExpiry = Date.now() + 3600000; // 1 hour
    await user.save();

    const resetUrl = `${req.protocol}://${req.get('host').replace(':6000', ':3000')}/forgot-password/${token}`;
    const message = `You are receiving this email because you requested a password reset. Please click the following link to reset your password: \n\n${resetUrl}`;

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'onlyforapp007@gmail.com', 
        pass: 'ycjl kvbs gnsl ybkt',
      }
    });
  

    await transporter.sendMail({
      to: user.email,
      subject: 'Password Reset Request',
      text: message,
    });

    res.status(200).json({ message: 'Password reset email sent' });
  } catch (err) {
    console.error('Error sending email:', err);
    res.status(500).json({ message: 'Error sending email' });
  }
});


app.post('/reset-password', async (req, res) => {
  const { token, password } = req.body;

  try {
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    user.password = password; // Make sure to hash this password in a real app
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    res.status(200).json({ message: 'Password has been reset' });
  } catch (err) {
    res.status(500).json({ message: 'Error resetting password' });
  }
});

app.post('/confirm-user', async (req, res) => {
  const { email, confirmationCode } = req.body;

  const user = await User.findOne({ email, confirmationCode });

  if (!user) {
    return res.status(400).send({ message: 'Invalid confirmation code' });
  }

  user.isConfirmed = true;
  user.confirmationCode = null; // Clear the confirmation code
  await user.save();

  res.status(200).send({ message: 'User confirmed successfully' });
});




const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'backend/uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

module.exports = upload;




app.use(express.static('./backend/uploads'));
app.use(express.static('/uploads'));
app.use(express.static('./server'));



app.get('/get-user', async function (req, res, next) {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

app.get('/users/:id', async (req, res) => {
  try {
      const user = await User.findById(req.params.id).select('-password');
      if (!user) {
          return res.status(404).send({ message: 'User not found' });
      }
      res.send(user);
  } catch (error) {
      res.status(500).send({ message: 'Error fetching user profile', error });
  }
});

app.put('/users/:id', async (req, res) => {
  try {
      const { name, email, password } = req.body;
      const updatedUser = await User.findByIdAndUpdate(req.params.id, {
          name,
          email,
          password, // Hash password before saving if needed
      }, { new: true }).select('-password');

      if (!updatedUser) {
          return res.status(404).send({ message: 'User not found' });
      }

      res.send(updatedUser);
  } catch (error) {
      res.status(500).send({ message: 'Error updating user profile', error });
  }
});
app.get('/bookings', async (req, res) => {
  const { userId } = req.query;

  try {
      const bookings = await BookingDetail.find({ userId });
      res.send(bookings);
  } catch (error) {
      res.status(500).send({ message: 'Error fetching bookings', error });
  }
});
app.post('/loginUser', async function (req, res, next) {
  try {
    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });

    if (user) {
      jwt.sign({ id: user._id }, 'cat is boling mioon in faisalabad', { expiresIn: '7d' }, function (err, myToken) {
        if (err) {
          next(err); // This passes the error to the error-handling middleware
        } else {
          res.json({
            user,
            myToken,
          });
        }
      });
    }else {
      res.json(null);
    }
  } catch (error) {
    next(error);
  }
});


app.post('/check-session', async function (req, res, next) {
  try {
    const token = req.body.token;

    if (!token) {
      return res.status(400).json({ message: 'Token is required' });
    }

    jwt.verify(token, 'cat is boling mioon in faisalabad', async function (err, decoded) {
      if (err) {
        return res.status(401).json({ message: 'Invalid or expired token' });
      }

      try {
        const user = await User.findById(decoded.id);
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json(user); 
      } catch (error) {
        next(error); 
      }
    });
  } catch (error) {
    next(error);
  }
});


app.post('/create-room', upload.array('roomImage', 10), async function (req, res, next) {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).send('No room images uploaded.');
    }

    const imageFiles = req.files.map(file => file.originalname);
 
    const nyaRoom = new Rooms({
      ...req.body,
      roomImage: imageFiles 
    });

    await nyaRoom.save();
    res.json(nyaRoom);
  } catch (error) {
    next(error);
  }
});



app.get('/get-rooms', async function (req, res, next) {
  try {
    const rooms = await Rooms.find();
    res.json(rooms);
  } catch (error) {
    next(error);
  }
});

app.put('/update-room/:id', async (req, res) => {
  const roomId = req.params.id;
  const updatedRoomData = req.body;

  try {

    const room = await Rooms.findByIdAndUpdate(roomId, updatedRoomData, { new: true });

    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }

    res.status(200).json({ message: 'Room updated successfully', room });
  } catch (error) {
    console.error('Error updating room:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/update-user/:id', async (req, res) => {
  const userId = req.params.id;
  const updatedUserData = req.body;

  try {

    const user = await User.findByIdAndUpdate(userId, updatedUserData, { new: true });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    console.error('Error updating User:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/delete-room', async (req, res, next) => {
  try {
    const roomId = req.query.id;
    if (!roomId) {
      return res.status(400).send('Room ID is required');
    }

    const deletedRoom = await Rooms.findByIdAndDelete(roomId);

    if (!deletedRoom) {
      return res.status(404).send('Room not found');
    }

    res.status(200).json({ message: 'Room deleted successfully', deletedRoom });
  } catch (error) {
    next(error);
  }
});

app.delete('/delete-user', async (req, res) => {
  const  id  = req.query.id;

  try {
    const user = await User.findByIdAndDelete(id);
    if (user) {
      res.status(200).send({ message: 'User deleted successfully' });
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Error deleting user', error });
  }
});


app.get('/bookingdetails', async function(req, res, next) {
  try {
 
    const bookings = await BookingDetail.find();

    if (!bookings.length) {
      return res.status(404).json({ error: 'No bookings found' });
    }
    
    res.json(bookings);
  } catch (error) {
    next(error);
  }
});



app.post('/booking-detail', async (req, res) => {
  try {
    const { 
      cnic, 
      phoneNo, 
      roomNo, 
      roomPrice, 
      roomName, 
      checkIn, 
      checkOut, 
      userName, 
      email, 
      adults,
      children, 
      specialRequests,
      userId
    } = req.body;

    const room = await Rooms.findOne({ roomNo });

    if (room) {
      room.roomStatus = 'Booked';
      room.currentBookings.push({ 
        checkIn: new Date(checkIn), 
        checkOut: new Date(checkOut),
        userId: userId,
      });
      await room.save();

      const numberOfDays = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
      const totalPrice = numberOfDays * roomPrice;

      const bookingDetail = new BookingDetail({
        userName,
        roomName,
        roomPrice,
        phoneNo,
        cnic,
        email,
        checkIn: new Date(checkIn),
        checkOut: new Date(checkOut),
        adults,
        children,
        specialRequests,
        numberOfDays,
        totalPrice,
        roomNo,
        userId
      });

      await bookingDetail.save();

      res.status(200).json({ message: 'Booking successful', bookingDetail });
    } else {
      res.status(404).json({ message: 'Room not found' });
    }
  } catch (error) {
    console.error('Error booking room:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});




app.post('/api/reviews', async (req, res) => {
  try {
    const review = new Review(req.body);
    await review.save();
    res.status(201).send(review);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get("/api/reviews",async (req, res)=>{
  try {
    const reviews = await Review.find(); // Fetch all reviews
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reviews', error });
  }
});

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Set up email transport
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'onlyforapp007@gmail.com', // Your email address
      pass: 'ycjl kvbs gnsl ybkt' // The application-specific password you generated
    }
  });

  const mailOptions = {
    from: email, // Your email address
    to: 'onlyforapp007@gmail.com', // The email address where you want to receive contact form submissions
    subject: `Contact Form Submission from ${name}`,
    text: `You have received a new message from your website contact form.\n\n` +
          `Here are the details:\n\n` +
          `Name: ${name}\n` +
          `Email: ${email}\n` +
          `Message:\n${message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ error: 'Error sending email' });
    } else {
      console.log('Email sent:', info.response);
      return res.status(200).json({ message: 'Email sent successfully' });
    }
  });
});

app.post('/checkout', upload.single('transactionSlip'), async (req, res) => {
  // Extract the original name of the uploaded file
  const transactionSlip = req.file ? req.file.originalname : null;

  try {
    // Create a new CheckOut document with the provided data and the file's original name
    const checkout = new CheckOutDetail({
      ...req.body,
      transactionSlip, // Store the file's original name
    });

    await checkout.save();
  

    // Respond with a success message
    res.status(200).json({ message: 'Checkout data saved successfully' });
  } catch (error) {
    // Handle errors and respond with an error message
    res.status(500).json({ error: error.message });
  }
});


app.post('/check-availability', async (req, res) => {
  const { checkInDate, checkOutDate } = req.body;

  try {
    // Convert the dates to Date objects for comparison
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    console.log(checkIn);
  
    

    // Fetch all rooms from the database
    const rooms = await Rooms.find(); // Assuming your Room model is named 'Rooms'

    // Filter available rooms
    const availableRooms = rooms.filter(room => {
      // Get all bookings for the current room
      const roomBookings = room.currentBookings;

      // Check if the room is available for the requested dates
      return roomBookings.every(booking => {
        const bookingCheckIn = new Date(booking.checkIn);
        const bookingCheckOut = new Date(booking.checkOut);

        return (
          (checkOut <= bookingCheckIn) || (checkIn >= bookingCheckOut)
        );
      });
    });

    // Return the available rooms
    res.json(availableRooms);
  } catch (err) {
    console.error('Error checking availability:', err);
    res.status(500).json({ error: err.message });
  }
});

app.get('/checkoutdetail', async (req, res)=>{
  try {
    const checkoutDetails = await CheckOutDetail.find(); 
    res.json(checkoutDetails);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching checkout details', error });
  }
});

app.post('/employees', upload.single('image'), async (req, res) => {
  const { name, facebook, instagram, twitter, position } = req.body;
  const image = req.file ? req.file.originalname : null;

  const newEmployee = new Employee({ name, image, facebook, instagram, twitter, position });
  await newEmployee.save();
  res.json(newEmployee);
});

app.get('/get/employees', async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
});

app.delete('/delete-employee', async (req, res) => {
  const  id  = req.query.id;

  try {
    const user = await Employee.findByIdAndDelete(id);
    if (user) {
      res.status(200).send({ message: 'User deleted successfully' });
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Error deleting user', error });
  }
});

app.put('/api/employees/:id', async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const employee = await Employee.findById(id);
    if (employee) {
      Object.assign(employee, updatedData);
      await employee.save();
      res.status(200).send({ message: 'Employee updated successfully' });
    } else {
      res.status(404).send({ message: 'Employee not found' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Error updating employee', error });
  }
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'onlyforapp007@gmail.com',
    pass: 'ycjl kvbs gnsl ybkt'
  }
});

const sendEmail = (to, subject, html) => {
  const mailOptions = {
    from: 'onlyforapp007@gmail.com',
    to,
    subject,
    html
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

const acceptanceEmailTemplate = (customerName, reservationDetails) => `
  <h1>Room Reservation Confirmation</h1>
  <p>Dear ${customerName},</p>
  <p>We are pleased to inform you that your room reservation has been successfully processed.</p>
  <h2>Reservation Details</h2>
  <ul>
    <li><strong>Reservation ID:</strong> ${reservationDetails.id}</li>
    <li><strong>Check-in Date:</strong> ${reservationDetails.checkInDate}</li>
    <li><strong>Check-out Date:</strong> ${reservationDetails.checkOutDate}</li>
    <li><strong>Room Type:</strong> ${reservationDetails.roomType}</li>
    <li><strong>Room No:</strong> ${reservationDetails.roomNo}</li>
    <li><strong>Sub-Total:</strong> ${reservationDetails.totalCost}</li>
  </ul>
  <p>Thank you for choosing our hotel. We look forward to welcoming you.</p>
  <p>Best regards,</p>
  <p>Hotel Kesar Palace</p>
`;

const rejectionEmailTemplate = (customerName, reservationDetails) => `
  <h1>Room Reservation Update</h1>
  <p>Dear ${customerName},</p>
  <p>We regret to inform you that your room reservation request has been rejected.</p>
  <h2>Reservation Details</h2>
  <ul>
    <li><strong>Reservation ID:</strong> ${reservationDetails.id}</li>
    <li><strong>Check-in Date:</strong> ${reservationDetails.checkInDate}</li>
    <li><strong>Check-out Date:</strong> ${reservationDetails.checkOutDate}</li>
    <li><strong>Room Type:</strong> ${reservationDetails.roomType}</li>
    <li><strong>Room No:</strong> ${reservationDetails.roomNo}</li>
    <li><strong>Sub-Total:</strong> ${reservationDetails.totalCost}</li>
  </ul>
  <p>If you have any questions or need further assistance, please contact us (03447883370).</p>
  <p>Best regards,</p>
  <p>Hotel Kesar Palace</p>
`;

app.put('/update-transaction-status', async (req, res) => {
  const { trID, status } = req.body;

  try {
    const transaction = await CheckOutDetail.findById(trID);
    if (transaction) {
      transaction.paymentStatus = status;
      await transaction.save();

      const customerEmail = transaction.email; // Adjust based on your schema
      const reservationDetails = {
        id: transaction._id,
        checkInDate: transaction.checkIn,
        checkOutDate: transaction.checkOut,
        roomType: transaction.roomName,
        roomNo: transaction.roomNo,
        totalCost: transaction.totalCost,
      };

      if (status === 'Success') {
        const subject = 'Room Reservation Success';
        const html = acceptanceEmailTemplate(transaction.userName, reservationDetails);
        sendEmail(customerEmail, subject, html);
      } else if (status === 'Rejected') {
        const subject = 'Room Reservation Update';
        const html = rejectionEmailTemplate(transaction.userName, reservationDetails);
        sendEmail(customerEmail, subject, html);
      }
      
      res.status(200).send({ message: 'Transaction status updated successfully' });
    } else {
      res.status(404).send({ message: 'Transaction not found' });
    }
  } catch (error) {
    console.error('Error updating transaction status:', error);
    res.status(500).send({ message: 'Error updating transaction status', error });
  }
});

app.put('/checkout-user', async (req, res) => {
  const { bookingId } = req.body;

  try {
    // Update the booking status
    const booking = await CheckOutDetail.findById(bookingId);
    if (booking) {
      booking.checkOut = 'Checked Out'; // Update the status
      await booking.save();
      const roomNo = booking.roomNo

      // Update the room's currentBookings array
      const room = await Rooms.findOne({roomNo});
    if (room) {
      
      room.roomStatus = 'Available';
      room.currentBookings = room.currentBookings.filter(
        (b) => !(b.userId === booking.userId)
      );
      await room.save();
    }

      res.status(200).send({ message: 'Checked out successfully' });
    } else {
      res.status(404).send({ message: 'Booking not found' });
    }
  } catch (error) {
    console.error('Error during checkout:', error);
    res.status(500).send({ message: 'Internal server error', error });
  }
});
