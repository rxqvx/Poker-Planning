import mongoose from 'mongoose'

const MONGODB_URI = "mongodb+srv://root:pZje0MrezMidJur0@cluster0.tu0eq.mongodb.net/pp"

  let cached = global.mongoose

  if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
  }
  
  async function dbConnect () {
    if (cached.conn) {
      return cached.conn
    }
  
    if (!cached.promise) {
      const opts = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        bufferCommands: false,
      }
  
      cached.promise = mongoose.connect(MONGODB_URI, opts).then(mongoose => {
        return mongoose
      })
    }
    cached.conn = await cached.promise
    return cached.conn
  }
  
  export default dbConnect