


import { Controller, Post, Body, UseGuards, HttpException, HttpStatus, Get, Put, Param } from '@nestjs/common';


import { CrearPagoDto } from './dto/create-pago.dto';
import { ApiTags } from '@nestjs/swagger';
import { MercadoPagoService } from './pagos.service';
import { UpdatePagoDto } from './dto/update-pago.dto';

@Controller('payments')
@ApiTags('Pagos')
export class PagosController {
  // constructor(private readonly pagosService: PagosService) {}
  constructor(private readonly mercadoPagoService: MercadoPagoService) {}

  
  @Post('')
  async createSuscripcion(@Body() crearPagoDto: CrearPagoDto) {
    if (crearPagoDto.metodoPago !== 'MercadoPago') {
      throw new HttpException(
        'Una vez realice el pago en efectivo en el gimnasio, se habilitará su acceso.',
        HttpStatus.BAD_REQUEST
      );
    }
    return await this.mercadoPagoService.createPreference(crearPagoDto);
  }

  @Post('efectivo')
  async createEfectivo(@Body() crearPagoDto: CrearPagoDto) {
    return await this.mercadoPagoService.createEfectivo(crearPagoDto);
  }

  @Get()
  async getAll() {
    return  this.mercadoPagoService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return await this.mercadoPagoService.getOne(id);
  }

  @Put(':id')
  async updateOne(@Body() id: string, @Body() dto: UpdatePagoDto) {
    return await this.mercadoPagoService.updateOne(id, dto);
  }
}
