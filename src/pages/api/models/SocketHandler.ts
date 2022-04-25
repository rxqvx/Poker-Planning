import {dbConnect} from '../../../dbConnect';
import {User} from '../../../schemas/UserModel';
import {socket} from "socket.io-client";

type Socket = socket

interface ISocket {
  connectionDataBase() : Promise<void>;
  joinRoom(payload: string): void;
  exitRoom(payload: string) : void;
  myVote(payload : string) : Promise<void>;
  adminShowVotes(payload : string ) : void;
  adminResetVotes(payload: string) : Promise<void>;
  adminChangedCard(payload : string) : void;
}

export class SocketHandler implements ISocket {
  private socket : Socket;
  constructor(socket: Socket) {this.socket = socket;}
  public connectionDataBase = async () : Promise<void> => {
    await dbConnect();
  }

  public joinRoom = (payload : string) : void => {
    const {room}  = JSON.parse(payload);
    this.socket.to(room).emit('user-joined', payload);
    this.socket.join(room);
  }

  public exitRoom = (payload : string) : void => {
    const {room} = JSON.parse(payload);
    this.socket.to(room).emit('user-left',payload);
    this.socket.leave(room);
  }

  public myVote = async (payload : string) : Promise<void> => {
    const {username,vote,room} = JSON.parse(payload);
    const update = await User.findOneAndUpdate({nameUser:username,roomUserName:room},
    {isVoted:true,voteValue:vote},{
        returnOriginal: false
    })
    this.socket.to(room).emit('user-voted',update);
  }

  public adminShowVotes = (payload : string ) : void => {
    const {isAdmin,room} = JSON.parse(payload);
      if(isAdmin){
        this.socket.to(room).emit('admin-shows',payload);
      }
  }

  public adminResetVotes = async (payload : string) : Promise<void>=> {
    const {isAdmin,room} = JSON.parse(payload);
      if(isAdmin){
        const update = await User.updateMany({roomUserName:room},
          {isVoted:false,voteValue:0})
          this.socket.to(room).emit('admin-reseted',payload);
      }
  }

  public adminChangedCard = (payload : string) : void => {
    const {isAdmin,room} = JSON.parse(payload);
    if(isAdmin){
        this.socket.to(room).emit('admin-changed',payload);
    }
  }
}
// const SocketHandler = async (socket : Socket) : Promise<ISocket> => {
//     await dbConnect();

//     const joinRoom = (payload : string) : void => {
//       const {room} = JSON.parse(payload);
//       socket.to(room).emit('user-joined', payload);
//       socket.join(room);
//     }

//     const exitRoom = (payload : Array<void>) : void => {
//       const {room} = JSON.parse(payload);
//       socket.to(room).emit('user-left',payload);
//     }

//     const myVote = async (payload : Array<void>) => {
//       const {username,vote,room} = JSON.parse(payload);
//       const update = await User.findOneAndUpdate({nameUser:username,roomUserName:room},
//         {isVoted:true,voteValue:vote},{
//           returnOriginal: false
//         })
//       socket.to(room).emit('user-voted',update);
//     }

//     const adminShowVotes = (payload) => {
//       const {isAdmin,room} = JSON.parse(payload);
//       if(isAdmin){
//           socket.to(room).emit('admin-shows',payload);
//       }
//     }
//     const adminResetVotes = async (payload) => {
//       const {isAdmin,room} = JSON.parse(payload);
//       if(isAdmin){
//         const update = await User.updateMany({roomUserName:room},
//           {isVoted:false,voteValue:0})
//         socket.to(room).emit('admin-reseted',payload);
//       }
//     }
//     const adminChangedCard = (payload) => {
//       const {isAdmin,room} = JSON.parse(payload);
//       if(isAdmin){
//         socket.to(room).emit('admin-changed',payload);
//       }
//     }
//     return {joinRoom, exitRoom,myVote,adminShowVotes,adminResetVotes,adminChangedCard};
//   }


