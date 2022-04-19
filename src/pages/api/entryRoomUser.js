import dbConnect from '../../dbConnect'
import {User} from '../../schemas/UserModel'
import {Room} from '../../schemas/RoomModel'

// search for users in the room, in the database
const usersInRoom = async (name) => {
  const roomSearch = await User.find(({roomUserName:name}))
  return roomSearch
}

// Find a room with this "name" in the database
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
      // And make that user a admin
      if(!await isUserCreated(nameUserPost,nameRoomPost)){
        const user = await User.create({
          nameUser: nameUserPost,
          roomUserName: nameRoomPost,
          isAdmin: true
        })
        const room = await Room.find({roomName:nameRoomPost})
        const users = await usersInRoom(nameRoomPost)
        // If is everything okay, he send a 200 HTTP status
        return res.status(200).json({room:room[0],usersInRoom:users})
      }
    }
    // if room is created but, no have any user, as he is the first he is the admin
    const usersRoom = await usersInRoom(nameRoomPost)
    if(usersRoom.length === 0){
      if(!await isUserCreated(nameUserPost,nameRoomPost)){
        const user = await User.create({
          nameUser: nameUserPost,
          roomUserName: nameRoomPost,
          isAdmin: true
        })
        const room = await Room.find(nameRoomPost)
        const users = await usersInRoom(nameRoomPost)
        // If is everything okay, he send a 200 HTTP status
        return res.status(200).json({room:room[0],usersInRoom:users})
      }
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
    
    const room = await Room.find({roomName:nameRoomPost})
    const users = await usersInRoom(nameRoomPost)
    // If is everything okay, he send a 200 HTTP status
    return res.status(200).json({room:room,usersInRoom:users})
  }catch(e){
    res.status(400).send({
      error: 'Error to create a room or user'
    })
  }
  
}
export default handler;
