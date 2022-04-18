import mongoose, { Schema } from 'mongoose';

const UserSchema =  new Schema({
    nameUser:{
        type: String,
        required: true,
    },
    roomUserName: {
        type:String,
        required: true
    },
    isVoted:{
        type: Boolean,
        default: false
    },
    voteValue:{
        type: Number,
        default: undefined 
    }
  })
  
export const User = mongoose.models.User || mongoose.model('User', UserSchema);