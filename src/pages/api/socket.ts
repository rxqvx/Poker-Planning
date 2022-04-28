import { Server, Socket } from 'socket.io'
import { SocketHandler } from './models/SocketHandler'


const socketController = (req , res) => {
  if (!res.socket.server.io){
    const io = new Server(res.socket.server)
    res.socket.server.io = io


    io.on('connection', async socket => {
      const socketHandler = new SocketHandler(socket);
      await socketHandler.connectionDataBase();

      const userName = socket.handshake.headers.username
      const roomName = socket.handshake.headers.roomname
      socket.on('join-room', payload =>{
        socketHandler.joinRoom(payload)
        socket.to(roomName).emit('user-joined', payload);
      })

      socket.on('my-vote', async payload =>{
        await socketHandler.myVote(payload)
        socket.to(roomName).emit('user-voted', payload);
      })


      socket.on('disconnecting',async reason =>{
        const payload = JSON.stringify({userName,roomName})
        await socketHandler.exitRoom(payload)
        socket.to(roomName).emit('user-disconnect',payload)
      })


      socket.on('admin-show-vote',() =>{
        socket.to(roomName).emit('admin-shows');
      })

      socket.on('admin-reset-votes',async () =>{
        await socketHandler.adminResetVotes(JSON.stringify({roomName}))
        socket.to(roomName).emit('admin-reseted');
      })

    //   socket.on('admin-change-card-vote',payload =>{

    //   })
    })
  }
  res.end()
}

export default socketController;
