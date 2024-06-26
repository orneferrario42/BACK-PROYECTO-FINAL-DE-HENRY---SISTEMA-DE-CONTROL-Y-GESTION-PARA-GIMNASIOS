import { Module } from '@nestjs/common';
import { ProfesorService } from './profesor.service';
import { ProfesorController } from './profesor.controller';

@Module({
  imports:[],
  controllers: [ProfesorController],
  providers: [ProfesorService],
})
export class ProfesorModule {}
