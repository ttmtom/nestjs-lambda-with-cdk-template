import { Body, Controller, Post } from '@nestjs/common';

@Controller('chat')
export class ChatController {
  @Post('message')
  async message(@Body() body: any) {
    return {
      message: 'Message received',
    };
  }
}
