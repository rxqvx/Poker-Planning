import dbConnect from '../../dbConnect'
import {User} from '../../schemas/UserModel'
import {Room} from '../../schemas/RoomModel'


const usersInRoom = async (name) => {
  const roomSearch = await User.find(({roomUserName:name}))
  return roomSearch
}
// Find a room with this "id" in the database
const isRoomCreated = async (name) => {
  const roomSearch = await Room.find(({roomName:name}))
  if(Array.isArray(roomSearch)) {
    return roomSearch.length !== 0;
  }
  return false
}
// Search for a user in the room, in the database
const isUserCreated = async (nick,room) => {
    const userSearch = await User.find(({
        nameUser: nick,
        roomUserName: room
    }))
    if(Array.isArray(userSearch)) {
      return userSearch.length !== 0;
    }
    return false
}

// Controller  
async function handler(req, res) {
  await dbConnect() // Make the connection to the database
  // METHOD = GET

  if(req.method === 'GET') {
    const roomNameQuery = req.query?.roomName;
    if(!roomNameQuery){
        return res.status(404).send({error: 'MISSING ROOM DATA'})
    }
    try{
      if(!await isRoomCreated((roomNameQuery))){
        const room = await Room.create({
          roomName: roomNameQuery,
          createdAt: (new Date().toLocaleString())
        })
        const users = await usersInRoom(roomNameQuery)
        return res.status(206).json({users})
      }
        const users = await usersInRoom(roomNameQuery)
        return res.status(206).json({users})
    }catch(e){
      return res.status(404).send({error:'Error creating the room'})
    }
  }



  // METHOD = POST
  const nameUserPost = req.body.userName;
  const nameRoomPost = req.body.roomName;
  try{
    // if room is not created create a room
    if(!await isRoomCreated((nameRoomPost))){
      const room = await Room.create({
        roomName: nameRoomPost,
        createdAt: (new Date().toLocaleString())
      })
    }
    // create a user in database if he doesn't in the room already
    if(!await isUserCreated(nameUserPost,nameRoomPost)){
        const user = await User.create({
            nameUser: nameUserPost,
            roomUserName: nameRoomPost,
        })
    }else{
        // If he already exists in the room, throw a 404 ERROR
        res.status(404).send({error: "User already in the room"})
    }
    const roomA = await Room.find({roomName:nameRoomPost})
    const usersA = await User.find({nameUser:nameUserPost,roomUserName:nameRoomPost})
    // If is everything okay, he send a 200 HTTP status
    return res.status(200).json({roomA,usersA})
  }catch(e){
    res.status(400).send({
      error: 'Error to create a room or user'
    })
  }
  
}
export default handler;
