import { IsDate, IsOptional, IsString } from 'class-validator';

export class UpdatePagoDto {
  /**
   * Esta es la propiedra de fecha de pago
   */
  @IsOptional()
  @IsDate()
  fecha_pago: Date;

  /**
   * Esta es la propiedra de metodo de pago
   */
  @IsOptional()
  @IsString()
  metodo_pago: string;
}
