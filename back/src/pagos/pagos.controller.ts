import { Controller, Post, Body, UseGuards, HttpException, HttpStatus, Get, Put } from '@nestjs/common';
// import { PagosService } from './pagos.service';
import { CrearPagoDto } from './dto/create-pago.dto';
import { ApiTags } from '@nestjs/swagger';
import { MercadoPagoService } from './pagos.service';
import { UpdatePagoDto } from './dto/update-pago.dto';

@Controller('payments')
@ApiTags('Pagos')
export class PagosController {
  // constructor(private readonly pagosService: PagosService) {}
  constructor(private readonly mercadoPagoService: MercadoPagoService) {}

  // @Post()
  @Get('create')
  async createSuscripcion(@Body() crearPagoDto: CrearPagoDto) {
    // if (crearPagoDto.metodoPago !== 'MercadoPago') {
    //   throw new HttpException(
    //     'Una vez realice el pago en efectivo en el gimnasio, se habilitará su acceso.',
    //     HttpStatus.BAD_REQUEST
    //   );
    // }
    // return this.pagosService.createSubscription(crearPagoDto);
    return this.mercadoPagoService.createPreference(crearPagoDto);
  }

  @Get()
  async getAll() {
    return this.mercadoPagoService.getAll();
  }

  @Get(':id')
  async getOne(@Body() id: string) {
    return this.mercadoPagoService.getOne(id);
  }

  @Put(':id')
  async updateOne(@Body() id: string, @Body() dto: UpdatePagoDto) {
    return this.mercadoPagoService.updateOne(id, dto);
  }
}
