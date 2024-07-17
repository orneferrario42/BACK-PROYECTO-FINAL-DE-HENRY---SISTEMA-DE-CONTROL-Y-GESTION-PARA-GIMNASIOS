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
  ParseIntPipe,
} from '@nestjs/common';
import { CrearPagoDto } from './dto/create-pago.dto';
import { ApiTags } from '@nestjs/swagger';
import { MercadoPagoService } from './pagos.service';
import { UpdatePagoDto } from './dto/update-pago.dto';

@Controller('payments')
@ApiTags('PAGOS')
export class PagosController {
  constructor(private readonly mercadoPagoService: MercadoPagoService) {}

  /**
   * Este es el metodo para crear el metodo de pago
   */

  @Post()
  async createSuscripcion(@Body() crearPagoDto: CrearPagoDto) {
    if (crearPagoDto.metodoPago !== 'MercadoPago') {
      throw new HttpException(
        'Una vez realice el pago en efectivo en el gimnasio, se habilitará su acceso.',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.mercadoPagoService.createPreference(crearPagoDto);
  }
  /***
   * Este metodo permite hacer un pago en efectivo
   */
  @Post('efectivo')
  async createEfectivo(@Body() crearPagoDto: CrearPagoDto) {
    return await this.mercadoPagoService.createEfectivo(crearPagoDto);
  }

  /**
   * este metodo permite ver al admin todos los pagos
   */
  @Get()
  async getAll(
    @Query('page', new ParseIntPipe()) page: number,
    @Query('limit', new ParseIntPipe()) limit: number,
  ) {
    if (page && limit) {
      const payments = await this.mercadoPagoService.getAll(page, limit);
      const metadata = await this.mercadoPagoService.getMetadata(limit);
      return {
        payments,
        metadata,
      };
    }
    return await this.mercadoPagoService.getAll(page, limit);
  }

  /**
   * este metodo permite ver al admin un pago
   */
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return await this.mercadoPagoService.getOne(id);
  }

  /**
   * este metodo permite actualizar los pagos
   */
  @Put(':userId')
  async updateOne(@Param('userId') userId: string, @Body() dto: UpdatePagoDto) {
    return await this.mercadoPagoService.updateOne(userId, dto);
  }
}
