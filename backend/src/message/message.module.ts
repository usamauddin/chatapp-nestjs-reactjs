import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageController } from './message.controller';
import { UserModule } from '../user/user.module';
import { MessageService } from './message.service';
import { MessageModel, MessageSchema } from './schema/message.schema';
import { ChatModule } from '../chat/Chat.module';



@Module({
  imports: [
    ChatModule,
    UserModule,
    MongooseModule.forFeature([{ name: MessageModel, schema: MessageSchema }])
  ],
  controllers: [MessageController],
  providers: [MessageService],
})


export class MessageModule {}
