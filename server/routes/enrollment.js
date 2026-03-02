import express from 'express';
import Enrollment from '../models/Enrollment.js';

const router = express.Router();

// POST /api/enroll — Create new enrollment
router.post('/enroll', async (req, res) => {
    try {
        const { childName, age, parentName, phone, email, interestLevel, message } = req.body;

        if (!childName || !age || !parentName || !phone || !email || !interestLevel) {
            return res.status(400).json({ error: 'All required fields must be filled' });
        }

        const enrollment = new Enrollment({ childName, age, parentName, phone, email, interestLevel, message });
        await enrollment.save();

        res.status(201).json({ success: true, message: 'Enrollment submitted successfully', data: enrollment });
    } catch (error) {
        console.error('Enrollment error:', error);
        res.status(500).json({ error: 'Server error. Please try again.' });
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
