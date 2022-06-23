import { Socket } from 'socket.io';
import { dbConnect } from '../../../dbConnect';
import { IUser,User } from '../../../schemas/UserModel';
import { UserFactory } from './UserFactory';

interface ISocket {
  connectionDataBase() : Promise<void>;
  myVote(payload : string) : Promise<void>;
  exitRoom(payload: string) : void;
  adminResetVotes(payload: string) : Promise<void>;
//   adminChangedCard(payload : string) : void;
}

export class SocketHandler implements ISocket {
  private socket : Socket;
  constructor(socket: Socket) {this.socket = socket;}
  connectionDataBase = async () : Promise<void> => {
    await dbConnect();
  }

  myVote = async (payload : string) : Promise<void> => {
    const { nameUser,roomUserName,voteValue } = JSON.parse(payload);
    const update = await User.findOneAndUpdate({nameUser:nameUser,roomUserName:roomUserName},{isVoted:true,voteValue},{returnOriginal: false})
  }

  exitRoom = async (payload : string) : Promise<void> => {
    const {nameUser,roomUserName} = JSON.parse(payload)
    await UserFactory.deleteUser(nameUser, roomUserName)
  }

  adminResetVotes = async (payload : string) : Promise<void>=> {
    const { roomUserName } = JSON.parse(payload);
    const update = await User.updateMany({roomUserName:roomUserName},
    {isVoted:false,voteValue:0})
  }

  changeAdmin = async (payload : string) : Promise<IUser[]>=> {
    const { nameUser,roomUserName : roomName } = JSON.parse(payload)
    await UserFactory.changeAdmin(nameUser,roomName)
    return await UserFactory.getUsersInRoom(roomName)
  }

//   public adminChangedCard = (payload : string) : void => {
//     const {isAdmin,room} = JSON.parse(payload);
//     if(isAdmin){
//         this.socket.to(room).emit('admin-changed',payload);
//     }
//   }
}
