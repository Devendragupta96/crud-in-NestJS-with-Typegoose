import { modelOptions, mongoose, prop} from '@typegoose/typegoose';
import { IsEmail } from 'class-validator';
@modelOptions({
    schemaOptions:{
        timestamps: true,

    }
})
export class User{
    _id:mongoose.Types.ObjectId

    @prop({
        type: String,
        required: true,
        unique:true,
        validate:[IsEmail,'invalid email']
    })
    email:string

    @prop({
        type: String,
        required:true,
    })
    password:string

    @prop({
        type: String,
        required:true,
    })
    name:string

    @prop({
        type: Number,
        required:true,
    })
    age:number
}