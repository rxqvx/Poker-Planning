import { Server, Socket } from 'socket.io'
import { SocketHandler } from './models/SocketHandler'


const socketController = (req , res) => {
  if (!res.socket.server.io){
    const io = new Server(res.socket.server)
    res.socket.server.io = io


    io.on('connection', async socket => {
      const socketHandler = new SocketHandler(socket);
      await socketHandler.connectionDataBase();

      const user = socket.handshake.headers.user
      if(typeof user !== 'string') return res.end()
      const { roomUserName,isAdmin } = JSON.parse(user)


      socket.on('join-room', payload =>{
        socket.join(roomUserName)
        socket.to(roomUserName).emit('user-joined', payload);
      })

      socket.on('my-vote', async payload =>{
        await socketHandler.myVote(payload)
        console.log("payload do my-vote\n",payload);
        socket.to(roomUserName).emit('user-voted', payload);
      })


      socket.on('disconnecting',async reason =>{
        if(isAdmin){
            const payload = JSON.stringify(await socketHandler.changeAdmin(user))
            console.log("Admin saiu"+payload)
            socket.to(roomUserName).emit('admin-disconnect',payload)
        }
        else{
            const payload = user
            socket.to(roomUserName).emit('user-disconnect',payload)
            await socketHandler.exitRoom(payload)
        }
      })

      socket.on('admin-show-vote',() =>{
        socket.to(roomUserName).emit('admin-shows');
      })

      socket.on('admin-reset-votes',async () =>{
        await socketHandler.adminResetVotes(JSON.stringify({user}))
        
        socket.to(roomUserName).emit('admin-reseted');
      })

      socket.on('admin-change-card-vote',payload =>{

      })
    })
  }
  res.end()
}

export default socketController;
