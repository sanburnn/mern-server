const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const LogAuth = require('../models/LogAuth');
const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        let user = await User.findOne({ username });
        if (user) return res.status(400).json({ msg: 'User already exists' });

        user = new User({ username, password });
        await user.save();

        res.status(201).json({ msg: 'User registered' });
    } catch (err) {
        res.status(500).send('Server error');
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

        const payload = { userId: user.id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        const log = new LogAuth({ userId: user.id, action: 'login' });
        await log.save();

        res.json({ token });
    } catch (err) {
        res.status(500).send('Server error');
    }
});

router.post('/logout', async (req, res) => {
    try {
        const token = req.header('x-auth-token');
        if (!token) return res.status(400).json({ msg: 'No token, authorization denied' });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const log = new LogAuth({ userId: decoded.userId, action: 'logout' });
        await log.save();

        res.json({ msg: 'Logged out successfully' });
    } catch (err) {
        res.status(500).send('Server error');
    }
});

module.exports = router;
