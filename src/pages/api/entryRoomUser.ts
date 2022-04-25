import {handlerAPI} from './models/entryRoomUserHandler';
import { NextApiRequest, NextApiResponse } from "next";

// TODO - USE THE ENTRY ROOM USER HANDLER
export default async (req: NextApiRequest, res: NextApiResponse) => {

    const { userName , roomName} = req.body
    try {
        // ONLY ACCEPT POST REQUESTS
        if (req.method !== 'POST'){
            return res.status(405).send({"cause": "BAD METHOD"})
        }
        if(!userName || !roomName){
            res.status(204).json({"cause":"NOT FOUND CONTENT"})
        }
        const handler = new handlerAPI();
        await handler.connectionDataBase(); // CONNECT WITH DATABASE

        // If room is created
        if(await handler.isRoomCreated(roomName)){
            if(await handler.isUserInRoom(userName, roomName)){
                return res.status(404).send({"cause":"User already in room"})
            }
            if(await handler.addUserInRoom(userName, roomName)){
                const users = await handler.getUsersInRoom(roomName)
                const room = await handler.getRoom(roomName)
                return res.status(201).json({users:users,room:room})
            }
            return res.status(404).send({message:"Can't add user in room"})
        }
        const room = await handler.createRoomAndAdmin(userName,roomName)
        const users = await handler.getUsersInRoom(roomName)
        return res.status(201).json({users,room})
    }catch(e){
        res.status(404).send({message:e.message})
    }
}
