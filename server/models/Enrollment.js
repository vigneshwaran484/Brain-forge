import mongoose from 'mongoose';

const enrollmentSchema = new mongoose.Schema({
    childName: { type: String, required: true },
    age: { type: Number, required: true, min: 5, max: 14 },
    parentName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    interestLevel: { type: String, required: true },
    message: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Enrollment', enrollmentSchema);
