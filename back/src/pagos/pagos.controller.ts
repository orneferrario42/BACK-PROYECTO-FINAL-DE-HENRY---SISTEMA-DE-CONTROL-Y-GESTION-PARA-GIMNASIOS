import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { PagosService } from './pagos.service';
import { CrearPagoDto } from './dto/create-pago.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Roles } from 'src/Decorators/roles.decorator';
import { Role } from 'src/enum/roles.enum';
import { RolesGuards } from 'src/auth/guards/roles.guards';

@Controller('payments')
@UseGuards(AuthGuard, RolesGuards)
export class PagosController {
  constructor(private readonly pagosService: PagosService) {}

  @Post()
  @Roles(Role.User)
  async createSuscripcion(@Body() crearPagoDto: CrearPagoDto) {
    return this.pagosService.createSubscription();
  }
}
