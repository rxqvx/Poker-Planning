import mongoose from 'mongoose'

const MONGODB_URI = "mongodb+srv://root:d5wvc2oA2KMDrNrv@cluster0.pabag.mongodb.net/pp"

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