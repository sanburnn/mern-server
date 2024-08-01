const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Email = require('../models/Email');


// router.post('/emails', async (req, res) => {
//     const { email, date, description } = req.body;

//     try {
//         const newEmail = new Email({ email, date, description });
//         await newEmail.save();

//         const transporter = nodemailer.createTransport({
//             host: "smtp.gmail.com",
//             port: 25,
//             secure: true,
//             auth: {
//                 user: process.env.EMAIL_USER, 
//                 pass: process.env.EMAIL_PASS  
//             }
//         });

//         const mailOptions = {
//             from: process.env.EMAIL_USER,
//             to: email, 
//             subject: 'New Event Created',
//             text: `You have created a new event on ${date}. Description: ${description}`
//         };

//         transporter.sendMail(mailOptions, (error, info) => {
//             if (error) {
//                 console.error('Error sending email:', error);
//                 return res.status(500).json({ msg: 'Email sending failed', error: error.message });
//             } else {
//                 console.log('Email sent:', info.response);
//                 return res.status(200).json({ msg: 'Email sent and saved successfully' });
//             }
//         });

//     } catch (err) {
//         console.error('Server error:', err);
//         res.status(500).json({ msg: 'Server error', error: err.message });
//     }
// });


router.post('/', async (req, res) => {
    const { email, date, description } = req.body;
    try {
        const newEmail = new Email({ email, date, description });
        await newEmail.save();
        res.status(201).json(newEmail);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
});

router.get('/', async (req, res) => {
    try {
        const emails = await Email.find();
        res.json(emails);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
});

router.put('/:id', async (req, res) => {
    const { email, date, description } = req.body;
    try {
        const updatedEmail = await Email.findByIdAndUpdate(req.params.id, { email, date, description }, { new: true });
        res.json(updatedEmail);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Email.findByIdAndDelete(req.params.id);
        res.json({ message: 'Email deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
});

module.exports = router;
