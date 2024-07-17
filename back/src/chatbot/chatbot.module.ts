import { Module } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { ChatbotController } from './chatbot.controller';
import { ProfesorService } from 'src/profesor/profesor.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profesor } from 'src/profesor/entities/profesor.entity';
import { User } from 'src/users/entities/user.entity';
import { ProfesorModule } from 'src/profesor/profesor.module';
import { UsersService } from 'src/users/users.service';
import { Plan } from 'src/plan/entities/plan.entity';
import { PlanService } from 'src/plan/plan.service';
import { Pago } from 'src/pagos/entities/pago.entity';
import { PlanRepository } from 'src/plan/plan.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Profesor, User, Plan, Pago])],
  providers: [
    ChatbotService,
    ProfesorService,
    UsersService,
    PlanService,
    PlanRepository,
  ],
  controllers: [ChatbotController],
})
export class ChatbotModule {}