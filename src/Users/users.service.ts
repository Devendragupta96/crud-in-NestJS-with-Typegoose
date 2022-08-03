import { Injectable,NotFoundException } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';

@Injectable()
export class UsersService {
    findOneBy: any;
    findOne: any;
    constructor(
        @InjectModel(User) private readonly userModel:ReturnModelType<typeof User>
    ){}

    async create(user: {email:string,password:string}):Promise<any>{
        const newUser=new this.userModel(user);
        return await newUser.save();
    }

    async findAll():Promise<User[]|null>{
        return await this.userModel.find().exec();
    }

    async remove(_id:string) {
        try{
            return await this.userModel.findByIdAndDelete(_id);


        }catch(e){
            console.log(e)
        }
    }
    async update(_id:string,attrs:Partial<User>){
        try{ 
            return await this.userModel.findByIdAndUpdate(_id,attrs);

        }catch(e)
        {
            console.log(e);
            
        }
}
}
