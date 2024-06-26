import { Module } from '@nestjs/common';
import { PagosService } from './pagos.service';
import { PagosController } from './pagos.controller';

@Module({
  controllers: [PagosController],
  providers: [PagosService],
})
export class PagosModule {}
