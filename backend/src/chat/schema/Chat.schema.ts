import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from 'mongoose';
import { UserModel } from '../../user/schemas/user.schema';


@Schema({
    timestamps: true
})

export class Chat {
    
    @Prop({ required: true, type: [{ type: Types.ObjectId, ref: UserModel }] })
    users: Types.ObjectId[];

    @Prop({ required: false, type: String })
    lastMessage: string | number;

}

export const ChatSchema = SchemaFactory.createForClass(Chat)
export const ChatModel = 'Chat'
export type ChatDocument = Document & Chat
