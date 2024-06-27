import { Module } from '@nestjs/common';
import { ProfesorService } from './profesor.service';
import { ProfesorController } from './profesor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profesor } from './entities/profesor.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Profesor])],
  controllers: [ProfesorController],
  providers: [ProfesorService],
})
export class ProfesorModule {}
