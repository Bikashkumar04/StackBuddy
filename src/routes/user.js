const express = require('express');
const User = require('../models/User'); // Import User model
const router = express.Router();

// Create a new user (Signup)
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, age, address, phone } = req.body;
        
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create and save new user
        const newUser = new User({ name, email, password, age, address, phone });
        await newUser.save();

        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;
