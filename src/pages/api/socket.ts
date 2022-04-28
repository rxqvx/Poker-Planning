import { Server, Socket } from 'socket.io'
import { SocketHandler } from './models/SocketHandler'


const socketController = (req , res) => {
  if (!res.socket.server.io){
    const io = new Server(res.socket.server)
    res.socket.server.io = io

    io.on('connection', async socket => {
      const socketHandler = new SocketHandler(socket);
      var currentUser;
      await socketHandler.connectionDataBase();

      socket.on('join-room', payload =>{
        socketHandler.joinRoom(payload)
        const {user,room} = JSON.parse(payload)
        currentUser = user;
        socket.to(room.roomName).emit('user-joined', payload);
      })

      socket.on('my-vote', async payload =>{
        await socketHandler.myVote(payload)
        const {room} = JSON.parse(payload)
        socket.to(room.roomName).emit('user-voted', payload);
      })


      socket.on('disconnect',async reason =>{
        await socketHandler.exitRoom(JSON.stringify({currentUser}))
        socket.to(currentUser.roomUserName).emit('user-disconnect',JSON.stringify(currentUser))
      })

    //   socket.on('admin-show-vote',payload =>{
    //     const {room} = JSON.parse(payload)
    //     socket.to(room.roomName).emit('admin-shows');
    //   })
    //   socket.on('admin-reset-votes',async payload =>{
    //     await socketHandler.adminResetVotes(payload)
    //     const {room} = JSON.parse(payload);
    //     socket.to(room.roomName).emit('admin-reseted',payload);
    //   })
    //   socket.on('admin-change-card-vote',payload =>{

    //   })
    })
  }
  res.end()
}

export default socketController;
