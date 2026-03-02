import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI;
        if (!uri) {
            console.error('❌ MONGO_URI is not defined in environment variables');
            console.warn('⚠️ Server will continue running, but database features will not work.');
            return;
        }

        // Log masked URI for debugging
        const maskedUri = uri.replace(/:\/\/([^:]+):([^@]+)@/, '://$1:****@');
        console.log(`🔗 Connecting to MongoDB: ${maskedUri}`);

        const conn = await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 10000,
        });

        console.log(`✅ MongoDB connected: ${conn.connection.host} (DB: ${conn.connection.name})`);
    } catch (error) {
        console.error(`❌ MongoDB connection error: ${error.message}`);
        if (error.message.includes('ENOTFOUND') || error.message.includes('getaddrinfo')) {
            console.error('   → Check your internet connection and Atlas cluster hostname.');
        }
        if (error.message.includes('authentication') || error.message.includes('auth')) {
            console.error('   → Check your Atlas username/password. Special characters in passwords must be URL-encoded.');
        }
        if (error.message.includes('querySrv') || error.message.includes('IP')) {
            console.error('   → Ensure your IP address is whitelisted in Atlas Network Access settings.');
        }
        console.warn('⚠️ Server will continue running, but database features (like enrollment) will not work.');
    }
};

export default connectDB;
