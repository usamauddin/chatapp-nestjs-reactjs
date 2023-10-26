import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '../user/user.module';
import { ChatController } from './Chat.controller';
import { ChatService } from './Chat.service';
import { ChatModel, ChatSchema } from './schema/Chat.schema';


@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([{ name: ChatModel, schema: ChatSchema }])
  ],
  controllers: [ChatController],
  providers: [ChatService],
  exports: [ChatService]
})


export class ChatModule {}
