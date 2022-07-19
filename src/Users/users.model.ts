import { modelOptions, mongoose, prop} from '@typegoose/typegoose';

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
        unique:true
    })
    email:string

    @prop({
        type: String,
        required:true,
    })
    password:string
}