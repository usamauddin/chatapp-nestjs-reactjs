import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserService } from '../user/user.service';
import { ChatDocument, ChatModel } from './schema/Chat.schema';


@Injectable()
export class ChatService {

  constructor(
    private user: UserService,
    @InjectModel(ChatModel) private chat: Model<ChatDocument>
  ) {
    // console.log(user)
  }

  async createChatRoom(body) {

    const userOne = await this.user.findOne(body.users[0])
    const userTwo = await this.user.findOne(body.users[1])

    if (!userOne) {
      throw new NotFoundException('First user not found')
    }

    else if (!userTwo) {
      throw new NotFoundException('Second user not found')
    }

    if (userOne && userTwo) {
      const chatroom = await this.chat.findOne({
        $and: [
          { users: { $elemMatch: { $eq: body.users[0] } } },
          { users: { $elemMatch: { $eq: body.users[1] } } },
        ],
      }).populate('users', '-password, -email')

      if (!chatroom) {
        const newChatRoom = await this.chat.create(body)
        return await this.chat.findById(newChatRoom._id).populate('users', '-password -email');
      } else {
        return chatroom;
      }
    }
  }

  async findUserChat(id) {
    return await this.chat.find({
      users: { $elemMatch: { $eq: { _id: id } } }
    }).populate('users', '-password').sort({ updatedAt: -1 })
  }

  deleteChat(id) {
    // console.log(id)
    return this.chat.findByIdAndDelete({ _id: id })
  }

  updateChat(id, body) {
    // console.log(id, body)
    return this.chat.findByIdAndUpdate(id, body)
  }

}

