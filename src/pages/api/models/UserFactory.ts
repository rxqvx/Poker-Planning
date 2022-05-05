import {User , IUser} from '../../../schemas/UserModel';


export class UserFactory{
    static async createUser(name: string,roomName:string,isAdmin:boolean) : Promise<IUser> {
        try{
            return await User.create({nameUser:name,roomUserName:roomName,isAdmin:isAdmin});
        }catch(e){
            return null;
        }
    }
    static async deleteUser(name:string,roomName:string) : Promise<boolean> {
        try{
            const user = await User.deleteOne({nameUser:name,roomUserName:roomName})
            if(user.deletedCount > 0 && user.acknowledged){
                return true;
            }
            return false;
        }catch(e){
            return false;
        }
    }
    static async getUsersInRoom(roomName:string) : Promise<IUser[]>{
        try{
            const users = await User.find({roomUserName:roomName});
            return users;
        }catch(e){
            return null;
        }
    }
    static async isUserInRoom(name:string,roomName:string) : Promise<boolean> {
        try{
            if (await User.findOne({nameUser:name,roomUserName:roomName}).exec() === null) {
                return false
            }
            return true
        }catch(e){
            return false;
        }
    }
    static async getUserInRoom(name:string,roomName:string) : Promise<IUser> {
        try{
            return await User.findOne({nameUser:name,roomUserName:roomName}).exec()
        }catch(e){
            return null;
        }
    }
    static async changeAdmin(name:string,roomUserName:string) : Promise<void>{
        try{
            await this.deleteUser(name,roomUserName)
            const users = await this.getUsersInRoom(roomUserName)
            await User.updateOne(
                {nameUser:users[0].nameUser,roomUserName:users[0].roomUserName},
                {isAdmin:true})
        }catch(e){
            return null
        }
    }
 }


