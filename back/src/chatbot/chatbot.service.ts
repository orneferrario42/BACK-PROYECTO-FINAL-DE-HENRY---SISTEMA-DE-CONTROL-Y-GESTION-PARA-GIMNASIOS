import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { witIAConfig } from 'src/config/witIa';

@Injectable()
export class ChatbotService {
  private readonly token: string = witIAConfig.token;
  private readonly witApiVersion: string = witIAConfig.witApiVersion;
  private readonly witBaseUrl: string = witIAConfig.witBaseUrl;

  async getResponse(message: string): Promise<string> {
    const url = `${this.witBaseUrl}?v=${this.witApiVersion}&q=${encodeURIComponent(message)}`;
    const headers = {
      Authorization: `Bearer ${this.token}`,
    };

    const response = await axios.get(url, { headers });
    const { data } = response;
    const intent = data.intents[0]?.name;

    switch (intent) {
      case 'greet':
        return '¡Hola! ¿Cómo puedo ayudarte hoy?';
      case 'goodbye':
        return '¡Adiós! Que tengas un buen día.';
      default:
        return 'Lo siento, no entendí eso.';
    }
  }
}
