import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreatePagoDto {
  /**
   * Esta es la propiedra de fecha de pago
   */
  @IsNotEmpty()
  @IsDate()
  fecha_pago: Date;

  /**
   * Esta es la propiedra de metodo de pago
   */
  @IsNotEmpty()
  @IsString()
  metodo_pago: string;
}
