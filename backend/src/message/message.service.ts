import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserService } from '../user/user.service';
import { MessageDocument, MessageModel } from './schema/message.schema';
import { ChatService } from '../chat/Chat.service';



@Injectable()
export class MessageService {

  constructor(
    private chat: ChatService,
    private user: UserService,
    @InjectModel(MessageModel) private messageModel: Model<MessageDocument>
  ) { }

  async create(body) {

    const result = await this.chat.findUserChat(body.chatId)
    if (!result) {
      throw new NotFoundException('Invalid chat id')
    }
    else {
      let message = await this.messageModel.create(body)
      // message = await message.populate('chatId')
      // message = await message.populate('senderId', 'id')
      await this.chat.updateChat(body.chatId, { lastMessage: body.message })
      return message
    }

  }

  async find(id) {
    return await this.messageModel.find({ chatId: id })
  }


}
