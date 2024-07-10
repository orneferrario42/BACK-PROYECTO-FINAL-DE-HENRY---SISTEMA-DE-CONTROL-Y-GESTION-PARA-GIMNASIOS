import { Module } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { ChatbotController } from './chatbot.controller';

@Module({
  providers: [ChatbotService],
  controllers: [ChatbotController]
})
export class ChatbotModule {}
