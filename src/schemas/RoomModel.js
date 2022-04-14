import mongoose, { Schema } from 'mongoose';

const RoomSchema =  new Schema({

    created_at : {
      type:Date,
      required:true
    }
  })
  
export const Room = mongoose.models.Room || mongoose.model('Room', RoomSchema);