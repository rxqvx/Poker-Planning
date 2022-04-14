import mongoose, { Schema } from 'mongoose';

const UserSchema =  new Schema({
    name:{
        type: String,
        required: true,
    },
    room_id: {
        type:[Number],
        required: true
    }
  })
  
export const User = mongoose.models.User || mongoose.model('User', RoomSchema);