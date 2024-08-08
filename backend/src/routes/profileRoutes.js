const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get user profile by email
router.get('/', async (req, res) => {
    try {
        const email = req.query.email;
        const user = await User.findOne({ email: email }).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching user profile' });
    }
});

// Update user password by email
router.put('/password', async (req, res) => {
    try {
        const { email, newPassword } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.password = newPassword; // In real-world applications, hash the password
        await user.save();
        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error updating password' });
    }
});

module.exports = router;
