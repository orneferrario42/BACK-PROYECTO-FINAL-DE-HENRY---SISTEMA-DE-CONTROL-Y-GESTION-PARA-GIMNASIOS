import { Module } from '@nestjs/common';
import { MercadoPagoService } from './pagos.service';
import { PagosController } from './pagos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pago } from './entities/pago.entity';
import { Plan } from '../plan/entities/plan.entity';
import { PlanRepository } from 'src/plan/plan.repository';
import { UsersRepository } from 'src/users/users.repository';
import { User } from 'src/users/entities/user.entity';
import { NotificationModule } from 'src/notificaciones/notification.module';
import { UsersService } from 'src/users/users.service';
import { ProfesorService } from 'src/profesor/profesor.service';
import { Profesor } from 'src/profesor/entities/profesor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Plan, Pago, User,Profesor],), NotificationModule],
  controllers: [PagosController],
  providers: [MercadoPagoService, PlanRepository, UsersRepository, UsersService, ProfesorService],
})
export class PagosModule {}
