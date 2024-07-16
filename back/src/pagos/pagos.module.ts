import { forwardRef, Module } from '@nestjs/common';
import { MercadoPagoService } from './pagos.service';
import { PagosController } from './pagos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pago } from './entities/pago.entity';
import { Plan } from '../plan/entities/plan.entity';
import { PlanRepository } from 'src/plan/plan.repository';
import { UsersRepository } from 'src/users/users.repository';
import { User } from 'src/users/entities/user.entity';
import { NotificationModule } from 'src/notificaciones/notification.module';

@Module({
  imports: [TypeOrmModule.forFeature([ Pago, Plan, User]), forwardRef(() => NotificationModule)],
  controllers: [PagosController],
  providers: [MercadoPagoService, PlanRepository, UsersRepository],
})
export class PagosModule {}
