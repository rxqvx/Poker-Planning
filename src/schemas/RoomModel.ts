import mongoose, { Schema, Document } from 'mongoose';

export interface IRoom extends Document{
    roomName: string,
    createdAt: Date,
    cardName: string
}
const RoomSchema =  new Schema<IRoom>({
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
