import { Controller, Post, Body, UseGuards, HttpException, HttpStatus, Get } from '@nestjs/common';
import { PagosService } from './pagos.service';
import { CrearPagoDto } from './dto/create-pago.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Roles } from 'src/Decorators/roles.decorator';
import { Role } from 'src/enum/roles.enum';
import { RolesGuards } from 'src/auth/guards/roles.guards';
import { ApiTags } from '@nestjs/swagger';

@Controller('payments')
@ApiTags('Pagos')
export class PagosController {
  constructor(private readonly pagosService: PagosService) {}

  @Get()
  async createSuscripcion(@Body() crearPagoDto: CrearPagoDto) {
    if (crearPagoDto.metodoPago !== 'MercadoPago') {
      throw new HttpException(
        'Una vez realice el pago en efectivo en el gimnasio, se habilitará su acceso.',
        HttpStatus.BAD_REQUEST
      );
    }
    return this.pagosService.createSubscription(crearPagoDto);
  }
}
