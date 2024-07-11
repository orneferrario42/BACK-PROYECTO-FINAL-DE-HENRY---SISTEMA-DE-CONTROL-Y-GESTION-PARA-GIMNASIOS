import { Module } from '@nestjs/common';
import { AvisosService } from './avisos.service';
import { AvisosController } from './avisos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Avisos } from './entity/avisos.entity';
import { AvisosGateway } from './avisos.gateway';
import { User } from 'src/users/entities/user.entity';
import { UsersRepository } from 'src/users/users.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Avisos, User]), AvisosModule],
  controllers: [AvisosController],
  providers: [AvisosService, AvisosGateway, UsersRepository],
})
export class AvisosModule {}