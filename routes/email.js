const express = require('express');
const router = express.Router();
const Email = require('../models/Email');

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
