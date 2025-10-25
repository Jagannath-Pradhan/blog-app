import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        if (mongoose.connection.readyState === 1) return; // Already connected

        await mongoose.connect(process.env.MONGODB_URI)
        console.log(`Connected to MongoDB ${mongoose.connection.host}`);
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1);
    }
};

export default connectDB;