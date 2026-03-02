import express from 'express';
import Enrollment from '../models/Enrollment.js';

import { body, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';

const router = express.Router();

// POST /api/enroll — Create new enrollment
router.post('/enroll', [
    body('childName').trim().notEmpty().withMessage('Child name is required'),
    body('age').isInt({ min: 5, max: 14 }).withMessage('Age must be between 5 and 14'),
    body('parentName').trim().notEmpty().withMessage('Parent name is required'),
    body('phone').trim().notEmpty().withMessage('Phone number is required'),
    body('email').isEmail().normalizeEmail().withMessage('Must be a valid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('interestLevel').trim().notEmpty().withMessage('Interest level is required'),
    body('message').optional().trim()
], async (req, res) => {
    // 1. Validation check
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { childName, age, parentName, phone, email, password, interestLevel, message } = req.body;

        // 2. Prevent duplicate emails
        const existingUser = await Enrollment.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: 'An enrollment with this email already exists.' });
        }

        // 3. Hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // 4. Save to DB
        const enrollment = new Enrollment({
            childName,
            age,
            parentName,
            phone,
            email,
            password: hashedPassword,
            interestLevel,
            message
        });

        await enrollment.save();

        res.status(201).json({ success: true, message: 'Enrollment submitted successfully' });
    } catch (error) {
        console.error('Enrollment error:', error);
        res.status(500).json({ error: 'Server error. Please try again later.' });
    }
});

// GET /api/enrollments — List all enrollments (admin)
router.get('/enrollments', async (req, res) => {
    try {
        const enrollments = await Enrollment.find().sort({ createdAt: -1 });
        res.json(enrollments);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

export default router;
