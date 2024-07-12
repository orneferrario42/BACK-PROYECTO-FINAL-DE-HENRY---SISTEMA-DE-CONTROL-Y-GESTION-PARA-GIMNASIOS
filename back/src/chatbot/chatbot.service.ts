import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { witIAConfig } from 'src/config/witIa';

@Injectable()
export class ChatbotService {
  private readonly token: string = witIAConfig.token;
  private readonly witApiVersion: string = witIAConfig.witApiVersion;
  private readonly witBaseUrl: string = witIAConfig.witBaseUrl;

  async getResponse(message: string): Promise<any> {
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
      case 'location':
        return '¡Claro que sí! Estamos ubicados en Leandro N.Alem 537 en Resistencia Chaco. ¿Algo mas en lo que te pueda ayudar hoy? ';
      case 'route':
        return {
          message: [
            'Sí mira, ve a Google Maps y sigue la ruta',
            ' https://maps.app.goo.gl/6hkxZKtj5E8XQAQaA ',
            '¿Algo mas en lo que te pueda ayudar?',
          ],
        };
      case 'open':
        return `El horario de atención de Power Training es el siguiente:\n\n

          Lunes: De  14:00 a 23:00hs\n
          Martes: De  14:00 a 23:00hs\n
          Miércoles: De  14:00 a 23:00hs\n
          Jueves: De  14:00 a 21:00hs\n
          Viernes: De  14:00 a 23:00hs\n
          Sábado: Cerrado\n
          Domingo: Cerrado.\n Dime si puedo ayudarte con algo más`;
      case 'information':
        return 'Power Training es un gimnasio se dedica a brindar servicios de entrenamiento físico  y acondicionamiento deportivo o terapéutico personalizado para personas de todas las edades y niveles de condición física.';
      case 'payments':
        return 'Claro, te comento que tenemos metodos de pago en efectivo en nuestras instalaciones y pagos en linea con mercado pago';
      default:
        return 'Lo siento, no entendí eso.';
    }
  }
}
