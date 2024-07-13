import { Body, Controller, Post } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('CHAT BOT')
@Controller('chatbot')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @Post()
  /***
   * Este metodo permite conectar con la IA de WIT de meta
   */
  @Post('')
  async getMessage(
    @Body('message') message: string,
  ): Promise<{ response: string }> {
    const response = await this.chatbotService.getResponse(message);
    return { response };
  }
}
