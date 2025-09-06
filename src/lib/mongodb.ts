import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

interface GlobalMongoDB {
  mongoose: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

declare global {
  var mongodb: GlobalMongoDB | undefined;
}

let cached = global.mongodb;

if (!cached) {
  cached = global.mongodb = { mongoose: { conn: null, promise: null } };
}

async function connectDB() {
  if (cached!.mongoose.conn) {
    return cached!.mongoose.conn;
  }

  if (!cached!.mongoose.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 10000, // Increased timeout
      socketTimeoutMS: 45000,
      family: 4, // Use IPv4, skip trying IPv6
      retryWrites: true,
    };

    cached!.mongoose.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('MongoDB connected successfully');
      return mongoose;
    }).catch((error) => {
      console.error('MongoDB connection error:', error);
      cached!.mongoose.promise = null; // Reset promise on error
      throw error;
    });
  }
  
  try {
    cached!.mongoose.conn = await cached!.mongoose.promise;
    return cached!.mongoose.conn;
  } catch (error) {
    cached!.mongoose.promise = null;
    throw error;
  }
}

export default connectDB;