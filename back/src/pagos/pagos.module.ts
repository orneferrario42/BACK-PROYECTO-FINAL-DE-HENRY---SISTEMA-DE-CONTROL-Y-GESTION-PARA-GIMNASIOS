import { Module } from '@nestjs/common';
import { PagosService } from './pagos.service';
import { PagosController } from './pagos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pago } from './entities/pago.entity';
import { Plan } from '../plan/entities/plan.entity';
import { planRepository } from 'src/plan/plan.repository';
import { UsersRepository } from 'src/users/users.repository';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([Plan, Pago, User])] ,
  controllers: [PagosController],
  providers: [PagosService, planRepository, UsersRepository],
})
export class PagosModule {}
