import { Server } from 'socket.io'
import { SocketHandler } from './models/SocketHandler'


const socketController = (req, res) => {
  if (!res.socket.server.io){
    console.log('Socket is initializing')
    const io = new Server(res.socket.server)
    res.socket.server.io = io

    io.on('connection', async socket => {
      const socketHandler = new SocketHandler(socket);
      await socketHandler.connectionDataBase();
      socket.on('join-room', socketHandler.joinRoom)
      socket.on('disconnect',socketHandler.exitRoom)
      socket.on("my-vote",socketHandler.myVote)
      socket.on('admin-show-vote',socketHandler.adminShowVotes)
      socket.on('admin-reset-votes',socketHandler.adminResetVotes)
      socket.on('admin-change-card-vote',socketHandler.adminChangedCard)
    })
  }
  res.end()
}

export default socketController;
