import {
  Controller,
  Post,
  Body,
  UseGuards,
  HttpException,
  HttpStatus,
  Get,
  Put,
  Param,
  Query,
} from '@nestjs/common';

import { CrearPagoDto } from './dto/create-pago.dto';
import { ApiTags } from '@nestjs/swagger';
import { MercadoPagoService } from './pagos.service';
import { UpdatePagoDto } from './dto/update-pago.dto';

@Controller('payments')
@ApiTags('PAGOS')
export class PagosController {
  // constructor(private readonly pagosService: PagosService) {}
  constructor(private readonly mercadoPagoService: MercadoPagoService) {}

  /**
   * Este es el metodo para crear el metodo de pago
   */
  // @Post()
  @Post('')
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
  /**
   * este metodo permite ver al admin todos los pagos
   */
  @Get()
  async getAll(@Query('page') page: number, @Query('limit') limit: number) {
    if (page && limit) {
      return await this.mercadoPagoService.getAll(page, limit);
    }
    return await this.mercadoPagoService.getAll(1, 5);
  }
  /**
   * este metodo permite ver al admin un pago
   */
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.mercadoPagoService.getOne(id);
  }

  /**
   * este metodo permite actualizar ls pagos
   */
  @Put(':id')
  async updateOne(@Body() id: string, @Body() dto: UpdatePagoDto) {
    return this.mercadoPagoService.updateOne(id, dto);
  }
}
