import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { witIAConfig } from 'src/config/witIa';
import { Plan } from 'src/plan/entities/plan.entity';
import { PlanService } from 'src/plan/plan.service';
import { Profesor } from 'src/profesor/entities/profesor.entity';
import { ProfesorService } from 'src/profesor/profesor.service';

@Injectable()
export class ChatbotService {
  private readonly token: string = witIAConfig.token;
  private readonly witApiVersion: string = witIAConfig.witApiVersion;
  private readonly witBaseUrl: string = witIAConfig.witBaseUrl;

  constructor(
    private readonly profesorService: ProfesorService,
    private readonly planesService: PlanService,
  ) {}
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
        return [
          'Sí mira, ve a Google Maps y sigue la ruta',
          ' https://maps.app.goo.gl/6hkxZKtj5E8XQAQaA ',
          '¿Algo mas en lo que te pueda ayudar?',
        ];
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
      case 'professor':
        const profesoresDb = await this.profesorService.getProfesores(1, 2);
        const info = this.formatProfessorInf(profesoresDb);
        console.log(info);
        return info;
      case 'planes':
        const planesDb = await this.planesService.findAll(1, 5);
        const infoPlan = this.formatPlanesInf(planesDb);
        return infoPlan;
      default:
        return 'Upps!! No tengo respuesta para esto. Intenta con estas preguntas: ¿Información de la página? ¿Planes? ¿Profesores? ¿Horarios? ¿Ubicacción? ¿Dirección?.';
    }
  }
  async formatProfessorInf(profesores: Profesor[]) {
    return `Estos son los profesores de Power Trainig:
${profesores.map(
  (profesor) => `Nombre: ${profesor.nombre}
Días disponibles: ${profesor.dia.join(' ')}
Horas disponibles: ${profesor.horario.join(' | ')}`,
)}
¿Algo más en lo que te pueda ayudar?`;
  }

  async formatPlanesInf(planes: Plan[]) {
    return `Estos son los planes con los que contamos:
${planes.map(
  (plan) => `Plan: ${plan.name}
Precio: ${plan.price}`,
)}
¿Algo más en lo que te pueda ayudar?`;
  }
}
