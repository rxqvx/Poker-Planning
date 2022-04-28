import { Socket } from 'socket.io';
import { dbConnect } from '../../../dbConnect';
import { User } from '../../../schemas/UserModel';
import { UserFactory } from './UserFactory';

interface ISocket {
  connectionDataBase() : Promise<void>;
  joinRoom(payload: string): void;
  myVote(payload : string) : Promise<void>;
  exitRoom(payload: string) : void;
//   adminShowVotes(payload : string ) : void;
//   adminResetVotes(payload: string) : Promise<void>;
//   adminChangedCard(payload : string) : void;
}

export class SocketHandler implements ISocket {
  private socket : Socket;
  constructor(socket: Socket) {this.socket = socket;}
  connectionDataBase = async () : Promise<void> => {
    await dbConnect();
  }

  joinRoom = (payload : string) : void => {
    const {room} = JSON.parse(payload)
    this.socket.join(room.roomName)
  }

  myVote = async (payload : string) : Promise<void> => {
    const {user,room,voteValue} = JSON.parse(payload);
    const update = await User.findOneAndUpdate({nameUser:user.nameUser,roomUserName:room.roomName},{isVoted:true,voteValue},{returnOriginal: false})
  }

  exitRoom = async (payload : string) : Promise<void> => {
    const { currentUser } = JSON.parse(payload)
    await UserFactory.deleteUser(currentUser.nameUser, currentUser.roomUserName)
  }

//   public adminShowVotes = async (payload : string ) : Promise<any> => {
//     const {room} = JSON.parse(payload);
//   }

//   public adminResetVotes = async (payload : string) : Promise<void>=> {
//     const {room} = JSON.parse(payload);
//     const update = await User.updateMany({roomUserName:room.roomName},
//           {isVoted:false,voteValue:0})

//   }

//   public adminChangedCard = (payload : string) : void => {
//     const {isAdmin,room} = JSON.parse(payload);
//     if(isAdmin){
//         this.socket.to(room).emit('admin-changed',payload);
//     }
//   }
}
