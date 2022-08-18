import mongoose from 'mongoose'
import { environment } from './common/environment';

export async function dbConnect () {
    const opts = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        bufferCommands: false,
    }
    return await mongoose.connect(environment.mongoDb.url, opts)
}
