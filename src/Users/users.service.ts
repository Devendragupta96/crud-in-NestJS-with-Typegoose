import { Injectable } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { UpdateUserDto } from './update.dto';

@Injectable()
export class UsersService {
    // findOneBy: any;
    // findOne: any;
    constructor(
        @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>
    ) { }

    async create(user: Partial<User>): Promise<any> {
        try {
            const newUser=new this.userModel(user);
            //console.log(newUser);
            //const newUser = (await this.userModel.create(user));///try with model function and save
            // console.log(newUser);
            // const res= newUser.save();
            // return {
            //     ok:true,
            //     newUser}
            return newUser.save();
        } catch (e) {
            console.log(e);

        }
    }

    async findAll() {
        const result = await this.userModel.find();
        return result;
    }
    async findUser(_id: string) {
        try {
            const result = await this.userModel.findOne({_id});
            return result;

        } catch (e) {
            console.log(e)
        }
    }

    async remove(_id: string) {
        try {
            const result = await this.userModel.findByIdAndDelete(_id);
            return result;

        } catch (e) {
            console.log(e)
        }
    }
    async update(_id: string, attrs: Partial<UpdateUserDto>) {
        try {
            const result = await this.userModel.findByIdAndUpdate(_id, attrs);
            return result;
        } catch (e) {
            console.log(e);

        }
    }
    async aggregate(){
        try{
            const result=await this.userModel.aggregate([
                {
                    $match:{ age:{$gte:30,$lte:50} }
                },
                {
                    $project:{
                        name:"$name",
                        email:"$email",
                        age:"$age" ,
                    }
                },
                {
                    $sort:{ age:-1}
                }
            ]);
         
            return result;
        }catch(err){
            console.log(err);
            
        }   
     }
}
