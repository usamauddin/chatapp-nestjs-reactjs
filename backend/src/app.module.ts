import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DBModule } from './db/db.module';
import { SocketModule } from './socket/socket.module';
import { UserModule } from './user/user.module';
import { ChatModule } from './chat/Chat.module';
import { MessageModule } from './message/message.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    DBModule,
    UserModule,
    ChatModule,
    MessageModule,
    SocketModule
  ],
  controllers: [AppController],
  providers: [AppService],

})

export class AppModule {}
