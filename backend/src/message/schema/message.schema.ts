import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { UserModel } from "../../user/schemas/user.schema";
import { ChatModel } from "../../chat/schema/Chat.schema";


@Schema({
    timestamps: true
})
export class Message {

    @Prop({ required: true, ref: ChatModel, type: Types.ObjectId })
    chatId: Types.ObjectId;

    @Prop({ required: true, ref: UserModel, type: Types.ObjectId })
    senderId: Types.ObjectId;

    @Prop({ required: true })
    type: string;

    @Prop({ required: true, type: String })
    message: string | number;
    
}

export const MessageSchema = SchemaFactory.createForClass(Message)
export const MessageModel = 'Message'
export type MessageDocument = Document & Message