import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ChatController } from './chat/chat.controller';
import {ConfigModule} from "@nestjs/config";

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, ChatController],
  providers: [],
})
export class AppModule {}
