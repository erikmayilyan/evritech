const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const Booking = require('../models/bookingModel');
const Website = require('../models/websiteModel');
const Graphic = require('../models/graphicModel');
const Contact = require('../models/contactPage');
const nodeMailer = require('nodemailer');
const moment = require('moment');

const getStartAndEndTimes = (date, time) => {
  const startDateTime = moment(`${date} ${time}`, 'YYYY-MM-DD HH:mm').toDate();
  const endDateTime = new Date(startDateTime.getTime() + 30 * 60 * 1000); 
  return { startDateTime, endDateTime };
};


router.post("/book-appointment", async (req, res) => {
  try {
    req.body.status = "Pending";
    const { date, time, firstName, lastName, location, businessName, category, timezone, email } = req.body;
    const { startDateTime, endDateTime } = getStartAndEndTimes(date, time);

    const existingBookings = await Booking.find({
      $and: [
        { startDateTime: { $lt: endDateTime } },
        { endDateTime: { $gt: startDateTime } }
      ]
    });

    if (existingBookings.length > 0) {
      req.body.status = "Rescheduled"; 
    }

    const newBooking = new Booking({
      ...req.body,
      startDateTime,
      endDateTime
    });

    await newBooking.save();

    const users = await User.find({
      $or: [{ isEmployee: true }, { isAdmin: true }]
    });

    const notification = {
      type: "New Booking",
      message: `A new booking has been made by ${firstName} ${lastName} for ${date} at ${time}.`,
      onClick: "/booking"
    };

    for (const user of users) {
      user.deliveredNotifications.push(notification);
      await user.save();
    };

    let transporter = nodeMailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'evritech.ca@gmail.com', 
        pass: 'drpnaetbsdaadbwh' 
      }
    });

    let adminMailOptions = {
      from: '"EVRI TECH" <evritech.ca@gmail.com>', 
      to: 'evritech.ca@gmail.com', 
      subject: 'New Booking Appointment',
      html: `<p>A new booking appointment has been made by ${firstName} ${lastName}.</p>
             <p><strong>Date:</strong> ${date}<br><strong>Time:</strong> ${time}</p>
             <p><strong>Client Info:</strong><br>
             <p><strong>First Name: ${firstName}</strong></p>
             <p><strong>Last Name: ${lastName}</strong></p>
             <p><strong>Business Name: ${businessName}</strong></p>
             <p><strong>Category: ${category}</strong></p>
             <p><strong>Location: ${location}</strong></p>
             <p><strong>Time Zone: ${timezone}</strong></p>
             <strong>Email:</strong> ${email}</p>`
    };

    await transporter.sendMail(adminMailOptions);

    res.status(200).send({
      message: "Appointment booked successfully, notifications sent to team members and emails sent",
      success: true, 
      booking: newBooking
    });
  } catch (error) {
    console.error("Error in book-appointment route:", error.message); 
    res.status(500).send({
      message: "Error booking an appointment",
      success: false,
      error: error.message 
    });
  }
});


router.post("/check-booking-availability", async (req, res) => {
  try {
    const { date, time } = req.body;
    const { startDateTime, endDateTime } = getStartAndEndTimes(date, time);

    const bookings = await Booking.find({
      $and: [
        { startDateTime: { $lt: endDateTime } },
        { endDateTime: { $gt: startDateTime } }
      ]
    });

    if (bookings.length > 0) {
      return res.status(409).send({
        message: "The selected time slot is not available",
        success: false
      });
    }

    res.send({
      message: "The selected time slot is available",
      success: true
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error checking availability",
      success: false,
      error
    });
  }
});

router.get('/the-websites', async (req, res) => {
  try {
    const theWebsites = await Website.find();
    res.json(theWebsites);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching websites', error
    })
  }
});

router.get('/the-graphic', async (req, res) => {
  try {
    const theGraphics = await Graphic.find();
    res.json(theGraphics);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching graphic design', error
    })
  }
});

router.post('/contactPage', async (req, res) => {
  console.log("req body", req.body);
  res.status(200).json({ message: "Request received successfully" });

  const {
    fullName,
    email,
    business,
    theMessage
  } = req.body;

  let transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'evritech.ca@gmail.com',
      pass: 'drpnaetbsdaadbwh'
    }
  });


  let message = {
    from: email,
    to: 'evritech.ca@gmail.com',
    subject: 'Contact Request (From Home Page)',
    html: `<html>
      <head>
        <style>
        @import url('https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,100..900;1,100..900&display=swap');

          body {
            background-color: red;
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
            color: #333333;
          }
          .info {
            margin-top: 20px;
          }
          .info p {
            margin: 5px 0;
          }
          .title {
            background-color: red;
            color: black;
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
            <h3>Contact Request (Contact Page)</h3>
          </div>
          <div class="info">
            <p><strong>Full Name:</strong> ${fullName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Business:</strong> ${business}</p>
            <p><strong>Message:</strong> ${theMessage}</p>
          </div>
        </div>
      </body>
    </html>`
  };

  transporter.sendMail(message, (error, info) => {
    if (error) {
      console.log("Error in sending mail", error);
      return res.status(400).json({
        message: `Error in sending mail ${error}`
      });
    } else {
      console.log("Successfully sent the mail", info);
      return res.json({
        message: info
      });
    }
  });
});

router.post('/contact-page', async (req, res) => {
  const { fullName, email, business, theMessage } = req.body;
  try {
    const newContact = new Contact({ fullName, email, business, theMessage });
    await newContact.save();
    res.status(201).json(newContact);
  } catch (error) {
    res.status(500).json({
      message: 'Error creating contact page', error
    });
  }
});

module.exports = router;
