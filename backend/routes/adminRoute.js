const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const Booking = require('../models/bookingModel');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const authMiddleware = require('../middlewares/authMiddleware');

router.get("/get-all-employees", authMiddleware, async (req, res) => {
  try {
    const employee = await User.find();
    res.status(200).send({
      message: "Employee fetched successfully",
      success: true,
      data: employee
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error getting employee",
      success: false,
      error,
    })
  }
});

router.post(
  "/book-appointment",
  authMiddleware,
  async (req, res) => {
    try {

    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error booking an appointment",
        success: false,
        error
      })
    }
  }
);

router.post("/change-appointment-status", authMiddleware, async (req, res) => {
  try {
    const { appointmentId, status, email, name, time, timezone } = req.body;

    const booking = await Booking.findByIdAndUpdate(appointmentId, {
      status
    }, { new: true });

    if (booking) {
      let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'evritech.ca@gmail.com',
          pass: 'drpnaetbsdaadbwh'
        },
      });

      if (status === "Approved") {
        let mailOptions = {
          from: '"EVRI TECH" evritech.ca@gmail.com',
          to: email,
          subject: 'Zoom Booking Appointment Approved',
          html: `<html>
                  <head>
                    <style>
                      @import url('https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,100..900;1,100..900&display=swap');

                      body {
                        background-color: rgb(210, 2, 2);
                        padding: 20px;
                      }
                      .container {
                        background-color: #ffffff;
                        border-radius: 10px;
                        padding: 20px;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                      }
                      .title h1 {
                        color: white;
                        font-family: "Exo 2", sans-serif;
                      }
                      .title h3 {
                        color: white;
                        font-family: "Exo 2", sans-serif;
                      }
                      h3 {
                        color: #a80303;
                      }
                      .info {
                        margin-top: 20px;
                      }
                      .info p {
                        margin: 5px 0;
                      }
                      .title {
                        background-color: rgb(210, 2, 2);
                        color: rgb(210, 2, 2);
                        padding: 20px;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                      }
                      .title h1 {
                        text-align: center;
                        margin-bottom: 5px;
                        color: #fff;
                      }
                      .title h3 {
                        color: #fff;
                        text-align: center;
                        margin-bottom: 10px;
                      }
                    </style>
                  </head>
                  <body>
                    <div class="container">
                      <div class="title">
                        <h1>EVRI TECH</h1>
                        <h3>Your Zoom Appointment with EVRI TECH Has Been Approved</h3>
                      </div>
                      <div class="info">
                        <p>
                          Dear ${name},
                          <br>
                          <br>
                          We are pleased to inform you that your Zoom appointment request has been successfully approved. We appreciate your trust in EVRI TECH, and we look forward to providing you with exceptional service.
                          <br>
                          <br>
                          Your appointment is scheduled for ${time} (${timezone}). Please mark your calendar, and be sure to join us on time to make the most of our meeting. We are committed to ensuring that your experience with us is both productive and enjoyable.
                          <br>
                          <br>
                          Thank you for choosing us as your technology partner. We are committed to ensuring that your experience with us is both productive and enjoyable.
                          <br>
                          <br>
                          If you have any questions or need further assistance, please don't hesitate to reach out. We're here to help!
                          <br>
                          <br>
                          Warm regards,
                          <br>
                          <br>
                          The EVRI TECH team
                        </p>
                      </div>
                    </div>
                  </body>
                </html>`
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return console.log(error);
          };
          console.log("Message sent: %s", info.messageId);
        });
      }

      if (status === "Rejected") {
        let mailOptions = {
          from: '"EVRI TECH" evritech.ca@gmail.com',
          to: email,
          subject: 'Zoom Booking Appointment Rejected',
          html: `<html>
                  <head>
                    <style>
                      @import url('https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,100..900;1,100..900&display=swap');

                      body {
                        background-color: rgb(210, 2, 2);
                        padding: 20px;
                      }
                      .container {
                        background-color: #ffffff;
                        border-radius: 10px;
                        padding: 20px;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                      }
                      .title h1 {
                        color: white;
                        font-family: "Exo 2", sans-serif;
                      }
                      .title h3 {
                        color: white;
                        font-family: "Exo 2", sans-serif;
                      }
                      h3 {
                        color: #a80303;
                      }
                      .info {
                        margin-top: 20px;
                      }
                      .info p {
                        margin: 5px 0;
                      }
                      .title {
                        background-color: rgb(210, 2, 2);
                        color: rgb(210, 2, 2);
                        padding: 20px;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                      }
                      .title h1 {
                        text-align: center;
                        margin-bottom: 5px;
                        color: #fff;
                      }
                      .title h3 {
                        color: #fff;
                        text-align: center;
                        margin-bottom: 10px;
                      }
                    </style>
                  </head>
                  <body>
                    <div class="container">
                      <div class="title">
                        <h1>EVRI TECH</h1>
                        <h3>Your Zoom Appointment with EVRI TECH Has Been Rejected</h3>
                      </div>
                      <div class="info">
                        <p>
                          Dear ${name},
                          <br>
                          <br>
                          We regret to inform you that your Zoom appointment request has been rejected. We apologize for any inconvenience this may cause.
                          <br>
                          <br>
                          If you have any questions or would like to reschedule, please feel free to reach out to us.
                          <br>
                          <br>
                          Warm regards,
                          <br>
                          <br>
                          The EVRI TECH team
                        </p>
                      </div>
                    </div>
                  </body>
                </html>`
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return console.log(error);
          };
          console.log("Rejection message sent: %s", info.messageId);
        });
      }

      res.status(200).send({
        success: true,
        message: `Appointment status changed to ${status} successfully`,
        data: booking,
      });
    } else {
      res.status(404).send({
        success: false,
        message: "Appointment not found",
      });
    }
  } catch (error) {
    console.error("Error updating appointment status:", error);
    res.status(500).send({
      success: false,
      message: "Error changing appointment status",
      error,
    });
  }
});

router.post('/register', async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res.status(200).send({
        message: "User already exists",
        success: false
      });
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;

    const newUser = new User(req.body);
    await newUser.save();

    res.status(200).send({
      message: "User created successfully",
      success: true
    });
  } catch (error) {
    console.error('Error during user registration:', error); 
    res.status(500).send({
      message: "Error creating user",
      success: false,
      error: error.message 
    });
  }
});

router.delete('/delete-employee/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'Employee not found' });
    };

    res.status(200).json({ success: true, message: 'Employee removed successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error removing employee', error })
  }
});

module.exports = router;