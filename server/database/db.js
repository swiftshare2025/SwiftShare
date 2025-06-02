import mongoose from 'mongoose';

const DBConnection = async () => {
  const MONGO_URI = process.env.MONGODB_URI;  

  try {
    mongoose.set("strictQuery", false); // this is optional but this ones function is to avoid deprecation warnings
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1); //this will make exit the app if DB connection fails
  }
};

export default DBConnection;
