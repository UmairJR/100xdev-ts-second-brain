import mongoose, { model, Schema } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export const connectToDb = async () => {
    await mongoose.connect(`${process.env.MONGODB_URL}`)
}

const UserSchema = new Schema({
    username: {type:String, unique:true},
    password: String
})

const ContentSchema = new Schema({
    title: String,
    link: String, 
    type: String,
    tags: [{type: mongoose.Types.ObjectId, ref:'Tag'}],
    userId: {type: mongoose.Types.ObjectId, ref:'User'}
})

export const UserModel = model('User', UserSchema)
export const ContentModel = model('Content', ContentSchema)