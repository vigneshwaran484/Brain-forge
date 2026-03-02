import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Enrollment from '../models/Enrollment.js';

dotenv.config();

const clearDb = async () => {
    try {
        const uri = process.env.MONGO_URI;
        if (!uri) {
            console.error('❌ MONGO_URI not found');
            process.exit(1);
        }

        await mongoose.connect(uri);
        console.log('✅ Connected to MongoDB for cleanup');

        const result = await Enrollment.deleteMany({});
        console.log(`🗑️ Deleted ${result.deletedCount} enrollments`);

        await mongoose.connection.close();
        console.log('🔌 Connection closed');
        process.exit(0);
    } catch (error) {
        console.error('❌ Cleanup failed:', error.message);
        process.exit(1);
    }
};

clearDb();
