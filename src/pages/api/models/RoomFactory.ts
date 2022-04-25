import {Room , IRoom} from '../../../schemas/RoomModel';


export class RoomFactory{
    static async createRoom(roomName: string) : Promise<IRoom>{
        try{
            return await Room.create({roomName:roomName,createdAt: (new Date().toLocaleString())});
        }catch(e){
            return null;
        }
    }
    static async isRoomCreated(roomName: string) : Promise<boolean>{
        try{
            const room  = await Room.find({roomName:roomName});
            if(Array.isArray(room)) {
                return room.length !== 0;
            }
            return false;
        }catch(e){
            return false;
        }
    }
    static async getRoom(roomName: string) : Promise<IRoom>{
        try{
            const room  = await Room.findOne({roomName:roomName}).exec();
            return room
        }catch(e){
            return null
        }
    }
}


