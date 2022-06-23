import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document{
    nameUser:string,
    roomUserName: string,
    isVoted: boolean,
    voteValue: String,
    isAdmin: boolean,
}

const UserSchema =  new Schema<IUser>({
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
        type: String,
        default: '-'
    },
    isAdmin:{
        type: Boolean,
        default: false,
    },

  })

export const User = mongoose.models.User || mongoose.model('User', UserSchema);
