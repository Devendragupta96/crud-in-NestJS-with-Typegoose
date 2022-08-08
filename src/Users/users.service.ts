import { Injectable } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from 'nestjs-typegoose';
import { mongoose, ReturnModelType } from '@typegoose/typegoose';

@Injectable()
export class UsersService {
    findOneBy: any;
    findOne: any;
    constructor(
        @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>
    ) { }

    async create(user: { email: string, password: string }): Promise<any> {
        try {
            //const newUser=new this.userModel(user);
            //console.log(newUser);
            const newUser = (await this.userModel.create(user));
            // console.log(newUser);
            // (await newUser).save();
            return {
                ok: true,
                newUser
            }
            //return newUser.save();
        } catch (e) {
            console.log(e);

        }
    }

    async findAll() {
        const result = await this.userModel.find();
        return {
            ok: true,
            result
        }
    }
    async findUser(_id: string) {
        try {
            const result = await this.userModel.findById(_id);
            return {
                ok: true,
                result
            }

        } catch (e) {
            console.log(e)
        }
    }

    async remove(_id: string) {
        try {
            const result = await this.userModel.findByIdAndDelete(_id);
            return {
                ok: true,
                result
            }

        } catch (e) {
            console.log(e)
        }
    }
    async update(_id: string, attrs: Partial<User>) {
        try {
            const result = await this.userModel.findByIdAndUpdate(_id, attrs);
            return {
                ok: true,
                result
            }
        } catch (e) {
            console.log(e);

        }
    }
}
