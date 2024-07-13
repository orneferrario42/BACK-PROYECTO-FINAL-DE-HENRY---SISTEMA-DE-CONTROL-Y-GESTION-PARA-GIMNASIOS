import { Body, Controller, Post } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';

@Controller('chatbot')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @Post()
  async getMessage(
    @Body('message') message: string,
  ): Promise<{ response: string }> {
    const response = await this.chatbotService.getResponse(message);
    return { response };
  }
}
