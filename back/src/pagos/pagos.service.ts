import {
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import * as mercadopago from 'mercadopago';
import { CrearPagoDto } from './dto/create-pago.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plan } from '../plan/entities/plan.entity';
import { Pago } from '../pagos/entities/pago.entity';
import { User } from 'src/users/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { UpdatePagoDto } from './dto/update-pago.dto';
import { NotificationService } from 'src/notificaciones/notification.service';

@Injectable()
export class MercadoPagoService {
  
  private mercadopagoClient: mercadopago.MercadoPagoConfig;
  @InjectRepository(Plan)
  private planRepository: Repository<Plan>;
  @InjectRepository(Pago)
  private pagosRepository: Repository<Pago>;
  @InjectRepository(User)
  private userRepository: Repository<User>;
  
  constructor(
    private notificationService:NotificationService
  ) {
    this.mercadopagoClient = new mercadopago.MercadoPagoConfig({
      accessToken:
      'APP_USR-6388226938088227-070410-84089c51e198a5281fed512e8c8f653e-1884641309',
    });
  }
  
  async createPreference(crearPagoDto: CrearPagoDto) {
    const preference = new mercadopago.Preference(this.mercadopagoClient);
    
    try {
      const plan = await this.planRepository.findOne({
        where: { id: crearPagoDto.id_plan },
      });
      
      const price = parseFloat(plan.price.toString());
      console.log(plan.price);
      
      if (!plan) {
        throw new HttpException('Plan no encontrado', HttpStatus.NOT_FOUND);
      }
      
      const user = await this.userRepository.findOne({
        where: { email: crearPagoDto.userEmail },
      });

      user.metodoPago = 'MercadoPago'
      user.estado = true
      this.userRepository.save(user)
      
      if (!user) {
        throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
      }
      
      const response = await preference.create({
        body: {
          items: [
            {
              id: uuidv4(),
              title: `Suscripcion al plan: ${plan.name}`,
              quantity: 1,
              unit_price: price,
            },
          ],
          back_urls: {
            failure: 'http://localhost:3000/finalstep',
            pending: 'http://localhost:3000/finalstep',
            success: 'http://localhost:3000/login',
          },
        },
      });
      
      //  Actualizar el plan del usuario
      user.plan = plan;
      await this.userRepository.save(user);
      
      //Guardar información del pago en la base de datos
      const pago = new Pago();
      pago.fecha_pago = new Date();
      pago.metodopago = 'MercadoPago';
      pago.id_plan = plan;
      pago.clientes = user;
      
      console.log(pago);
      
      await this.pagosRepository.save(pago);

      // Enviar notificación al administrador
      await this.notificationService.sendNotificationAdmin(
        `Hey! ${user.email} acaba de realizar un pago de ${price} por el ${plan.name}.`);
      
      return response;
    } catch (error) {
      throw new Error(`Error de preferencia  ${error.message}`);
    }
  }

  
  async getAll(page: number, limit: number): Promise<Pago[]> {
    const pagos = await this.pagosRepository.find({
      relations: ['clientes', 'id_plan'],
    });

    return pagos;
  }
  
  async getOne(id: string) {
    const pago = this.pagosRepository.findOne({ where: { id } });
    return pago;
  }
  
  async updateOne(userId: string, dto: UpdatePagoDto) {
    // Buscar el usuario
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }
  
    // Buscar el pago asociado al usuario
    let pago = await this.pagosRepository.findOne({ 
      where: { clientes: { id: userId } },
      relations: ['clientes', 'id_plan']
    });
  
    if (!pago) {
      // Si no existe un pago, crear uno nuevo
      pago = new Pago();
      pago.clientes = user;
      pago.fecha_pago = new Date(); // Fecha actual
      // Asigna otros campos necesarios para un nuevo pago
    }
  
    // Actualizar los campos del pago
    if (dto.metodo_pago) {
      pago.metodopago = dto.metodo_pago;
      // Actualizar también el metodoPago del usuario
      user.metodoPago = dto.metodo_pago;
    }
    // Actualiza otros campos según sea necesario
  
    // Guardar los cambios del pago
    await this.pagosRepository.save(pago);
  
    // Guardar los cambios del usuario
    return await this.userRepository.save(user);
  }
    
  async createEfectivo(crearPagoDto: CrearPagoDto) {
    const plan = await this.planRepository.findOne({
      where: { id: crearPagoDto.id_plan },
    })

    const user = await this.userRepository.findOne({
      where: { email: crearPagoDto.userEmail },
      relations: ['pagos'],
    })
    user.metodoPago = 'Efectivo'
    user.estado = true
    await this.userRepository.save(user)

    const pago = new Pago();
    pago.fecha_pago = new Date();
    pago.metodopago = 'Efectivo';
    pago.id_plan = plan;
    pago.clientes = user;
    console.log(pago)

    const pagoGuardado = await this.pagosRepository.save(pago);
    return pagoGuardado;
  }

  }

