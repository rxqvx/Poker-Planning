import mongoose, { Schema } from 'mongoose';

const RoomSchema =  new Schema({
    roomName: { 
      type: String,
      required: true
    },
    createdAt : {
      type:Date,
      required:true
    },
    cardName: {
      type: String,
      default: undefined
    }
  })
  
export const Room = mongoose.models.Room || mongoose.model('Room', RoomSchema);