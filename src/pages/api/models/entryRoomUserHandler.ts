import { dbConnect } from '../../../dbConnect'
import { IUser } from '../../../schemas/UserModel'
import { IRoom } from '../../../schemas/RoomModel'
import { UserFactory } from './UserFactory';
import { RoomFactory } from './RoomFactory';

interface IHandler {
  connectionDataBase() : Promise<void>; // Conecta ao database
  isUserInRoom(userName: string, roomName: string) : Promise<boolean>; // O usuario esta na sala? True or false
  getRoom(roomName: string) : Promise<IRoom>; //  Da um select na sala
  isRoomCreated(roomName: string) : Promise<boolean>; // Retorna se a sala está criada
  createRoomAndAdmin(userName: string,roomName: string) : Promise<IRoom>; // Cria a sala
  addUserInRoom(userName: string,roomName: string) : Promise<IUser>; // Adiciona o user a sala
  removeUserInRoom(userName: string,roomName: string) : Promise<boolean>; // Remove o user da sala
  getUsersInRoom(roomName: string) : Promise<IUser[]>;
}

// Handler
export class handlerAPI implements IHandler{

  connectionDataBase = async () : Promise<void> => {
    await dbConnect();
  }

  async isUserInRoom(userName: string, roomName: string) : Promise<boolean> {
    return await UserFactory.isUserInRoom(userName, roomName);
  }

  async getRoom(roomName: string) : Promise<IRoom>{
    return await RoomFactory.getRoom(roomName);
  }
  async isRoomCreated(roomName: string) : Promise<boolean>{
    return await RoomFactory.isRoomCreated(roomName);
  }
  async createRoomAndAdmin(userName: string,roomName: string) : Promise<IRoom>{
    const room = await RoomFactory.createRoom(roomName);
    const user =  await UserFactory.createUser(userName,roomName,true);
    return room
  }

  async addUserInRoom(userName: string,roomName: string) : Promise<IUser>{
    return await UserFactory.createUser(userName,roomName,false);
  }

  async removeUserInRoom(userName: string,roomName: string) : Promise<boolean>{
    return await UserFactory.deleteUser(userName,roomName);
  }

  async getUserInRoom(userName: string,roomName: string) : Promise<IUser>{
      return await UserFactory.getUser(userName,roomName);
  }
  async getUsersInRoom(roomName: string) : Promise<IUser[]>{
    return await UserFactory.getUsersInRoom(roomName);
  }

}
