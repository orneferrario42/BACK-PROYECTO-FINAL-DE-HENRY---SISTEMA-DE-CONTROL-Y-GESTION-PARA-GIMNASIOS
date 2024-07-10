import { Module } from '@nestjs/common';
import { AvisosService } from './avisos.service';
import { AvisosGateway} from './avisos.gateway';
import { AvisosController } from './avisos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Avisos } from './entity/avisos.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Avisos])],
  controllers: [AvisosController],
  providers: [ AvisosService, AvisosGateway],

})
export class AvisosModule {}
