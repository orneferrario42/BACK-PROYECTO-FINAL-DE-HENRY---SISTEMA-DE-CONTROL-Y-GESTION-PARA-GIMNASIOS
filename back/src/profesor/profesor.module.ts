import { Module, forwardRef } from '@nestjs/common';
import { ProfesorService } from './profesor.service';
import { ProfesorController } from './profesor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profesor } from './entities/profesor.entity';
import { User } from 'src/users/entities/user.entity';
import { PlanRepository } from 'src/plan/plan.repository';
import { Plan } from 'src/plan/entities/plan.entity';
import { PlanModule } from 'src/plan/plan.module';
import { UsersService } from 'src/users/users.service';
import { Pago } from 'src/pagos/entities/pago.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Profesor, User, Plan, Pago]),
    forwardRef(() => PlanModule), // Uso de forwardRef para evitar dependencias circulares
  ],
  controllers: [ProfesorController],
  providers: [ProfesorService, UsersService, PlanRepository],
})
export class ProfesorModule {}
