import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as mercadopago from 'mercadopago';
import { CrearPagoDto } from "./dto/create-pago.dto";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plan } from "../plan/entities/plan.entity";
import { Pago } from "./entities/pago.entity";
import axios from "axios";

@Injectable()
export class PagosService {
  constructor(
    private configService: ConfigService,
    @InjectRepository(Plan)
    private planRepository: Repository<Plan>,
    @InjectRepository(Pago)
    private pagosRepository: Repository<Pago>,
  ) {
    // mercadopago.configurations.setAccessToken(this.configService.get('MERCADOPAGO_ACCESS_TOKEN'));
  }

  // async crearPago(createPagoDto: CrearPagoDto): Promise<any> {
  //   const { fecha_pago, metodoPago, id_plan } = createPagoDto;

  //   const plan = await this.planRepository.findOneBy(id_plan);
  //   if (!plan) {
  //     throw new HttpException('Plan no encontrado', HttpStatus.NOT_FOUND);
  //   }

  //   const datosPago = {
  //     transaction_amount: plan.price,
  //     token: metodoPago,
  //     description: `Pago del plan: ${plan.name}`,
  //     payment_method_id: metodoPago,
  //   };

  //   try {
  //     const response = await mercadopago.Payment.create(datosPago);

  //     const nuevoPago = new Pago();
  //     nuevoPago.fecha_pago = fecha_pago;
  //     nuevoPago.metodopago = metodoPago;
  //     nuevoPago.id_plan = plan;  

  //     await this.pagosRepository.save(nuevoPago);

  //     return response;
  //   } catch (error) {
  //     throw new HttpException('No se pudo realizar el pago', HttpStatus.BAD_REQUEST);
  //   }
  // }

  async createSubscription() {
    const url = "https://api.mercadopago.com/preapproval";

    const body = {
      reason: "Suscripción de ejemplo",
      auto_recurring: {
        frequency: 1,
        frequency_type: "months",
        transaction_amount: 10,
        currency_id: "ARS"
      },
      back_url: "https://google.com.ar",
      payer_email: "test_user_46945293@testuser.com"
    };

    const subscription = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`
      }
    });

}
}