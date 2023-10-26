import { Body, Controller, Delete, Get, Param, Post, ValidationPipe } from '@nestjs/common';
import { ChatService } from './Chat.service';
import { ChatDto } from './dto/Chat.dto';


@Controller('chat')
export class ChatController {

  constructor(private readonly chatService: ChatService) { }

  @Post('/post')
  createChatRoom(@Body(ValidationPipe) body: ChatDto) {
    return this.chatService.createChatRoom(body);
  }

  @Get('/get/:id')
  findUserChat(@Param('id') id) {
    return this.chatService.findUserChat(id);
  }

  @Delete('/:id')
  deleteUserChat(@Param('id') id) {
    return this.chatService.deleteChat(id);
  }


}
