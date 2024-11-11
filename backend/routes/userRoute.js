const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const Booking = require('../models/bookingModel');
const Website = require('../models/websiteModel');
const Graphic = require('../models/graphicModel');
const Contact = require('../models/contactPage');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const authMiddleware = require("../middlewares/authMiddleware");

const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');  
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);  
  }
});

const upload = multer({ storage: storage });

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(200).send({ message: "User does not exist", success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(200).send({ message: "Password is incorrect", success: false });
    } else {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
      res.status(200).send({ message: "Login successful", success: true, data: token });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error logging in", success: false, error });
  }
});

router.post("/get-user-info-by-id", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
    if (!user) {
      return res.status(200).send({ message: "User does not exist", success: false });
    }
    user.password = undefined;
    res.status(200).send({ success: true, data: user });
  } catch (error) {
    res.status(500).send({ message: "Error getting user info", success: false, error });
  }
});

router.post("/get-employee-info-by-user-id", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.body.userId });
    res.status(200).send({
      success: true,
      message: "Employee info fetched successfully"
    });
  } catch (error) {
    res.status(500).send({ message: "Error getting employee info", success: false, error });
  }
});

router.post("/update-employee-profile", authMiddleware, async (req, res) => {
  try {
    const employee = await User.findOneAndUpdate(
      { _id: req.body.userId },
      req.body,
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Employee profile updated successfully",
      data: employee
    });
  } catch (error) {
    res.status(500).send({ message: "Error updating employee info", success: false, error });
  }
});

router.get("/get-all-bookings", authMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).send({
      message: "All appointments fetched successfully",
      success: true,
      data: bookings,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error fetching appointments",
      success: false,
      error,
    });
  }
});

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ Status: "User does not exist!" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS 
      }
    });

    let mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Reset Your Password',
      text: `http://localhost:3006/reset-password/${user._id}/${token}`
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("Email error:", error);
        return res.status(500).send({ Status: "Failed to send email" });
      } else {
        return res.send({ Status: "Success" });
      }
    });
  } catch (error) {
    console.log("Server error:", error);
    res.status(500).send({
      message: "Error with Forgot Password",
      success: false,
      error,
    });
  }
});

router.post("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) {
      return res.json({ Status: "Error with token" });
    } else {
      bcrypt.hash(password, 10)
        .then(hash => {
          User.findByIdAndUpdate({ _id: id }, { password: hash })
            .then(() => res.send({ status: "Success" }))
            .catch(error => res.send({ status: error }));
        })
        .catch(error => res.send({ status: error }));
    }
  });
});

router.get('/getWeb', (req, res) => {
  Website.find({})
  .then(websites => res.json(websites))
  .catch(error => res.json(error))
});

router.get('/getWeb/:id', (req, res) => {
  const id = req.params.id;
  Website.findById(id)
  .then(websites => res.json(websites))
  .catch(error => res.status(500).json({ error: error.message }));
});

router.put('/updateWeb/:id', upload.single('image'), (req, res) => {
  const { title, description, link, urlTitle } = req.body;
  const image = req.file ? `uploads/${req.file.filename}` : '';

  Website.findByIdAndUpdate(req.params.id, {
    title,
    image,
    description,
    link,
    urlTitle
  }, { new: true })
    .then(updatedWebsite => {
      if (!updatedWebsite) {
        return res.status(404).json({ message: 'Website not found' });
      }
      res.status(200).json(updatedWebsite);
    })
    .catch(error => res.status(500).json({ message: 'Failed to update website', error: error.message }));
});

router.post("/createWeb", upload.single('image'), (req, res) => {
  try {
    console.log(req.file);
    console.log(req.body);

    const { title, description, link, urlTitle } = req.body;
    const image = req.file ? `uploads/${req.file.filename}` : '';

    Website.create({
      title,
      image,
      description,
      link,
      urlTitle
    })
    .then(website => res.status(201).json(website))
    .catch(error => res.status(400).json({ error: error.message }));
  } catch (error) {
    console.error("Error creating website:", error);
    res.status(500).send({ message: "Internal Server Error", success: false });
  }
});

router.delete('/deleteWeb/:id', (req, res) => {
  const id = req.params.id;
  Website.findByIdAndDelete({ _id : id })
  .then(res => res.json(res))
  .catch(error => res.json(error))
});

router.get('/getGraphic', (req, res) => {
  Graphic.find({})
  .then(graphics => res.json(graphics))
  .catch(error => res.json(error))
});

router.post("/createGraphic", upload.single('image'), (req, res) => {
  try {
    console.log(req.file);
    console.log(req.body);

    const { title, description } = req.body;
    
    if (!title || !description || !req.file) {
      return res.status(400).json({ error: 'Title, description, and image are required fields.' });
    }

    const image = `uploads/${req.file.filename}`;

    Graphic.create({
      title,
      image,
      description
    })
    .then(graphic => res.status(201).json(graphic))
    .catch(error => res.status(400).json({ error: error.message }));

  } catch (error) {
    console.error("Error creating graphic design:", error);
    res.status(500).send({ message: "Internal Server Error", success: false });
  }
});

router.get('/getGraphic/:id', (req, res) => {
  const id = req.params.id;
  Graphic.findById(id)
    .then(graphic => res.json(graphic))
    .catch(error => res.status(500).json({ error: error.message }));
});

router.put('/updateGraphic/:id', upload.single('image'), (req, res) => {
  const { title, description } = req.body;
  const image = req.file ? `uploads/${req.file.filename}` : '';

  Graphic.findByIdAndUpdate(req.params.id, {
    title,
    image,
    description
  }, { new: true })
    .then(updatedGraphic => {
      if (!updatedGraphic) {
        return res.status(404).json({ message: 'Graphic not found' });
      }
      res.status(200).json(updatedGraphic);
    })
    .catch(error => res.status(500).json({ message: 'Failed to update graphic design', error: error.message }));
});

router.delete('/deleteGraphic/:id', (req, res) => {
  const id = req.params.id;
  Graphic.findByIdAndDelete({ _id : id })
  .then(res => res.json(res))
  .catch(error => res.json(error))
});

router.get('/contact-page', async (req, res) => {
  try {
    const contactPage = await Contact.find();
    console.log("Fetched contacts:", contactPage); 
    res.json(contactPage);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching contacts', error
    });
  }
});

module.exports = router;

