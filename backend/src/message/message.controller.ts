import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MessageService } from './message.service';
// import { PrivatemessageService } from './message.service';

@Controller('message')
export class MessageController {

  constructor(private readonly messageService: MessageService) {}

  @Post('/post')
  sendMessage(@Body() body) {
    return this.messageService.create(body);
  }


  @Get('/get/:id')
  findUserChat(@Param('id') id) {
    return this.messageService.find(id);
  }

 
}
