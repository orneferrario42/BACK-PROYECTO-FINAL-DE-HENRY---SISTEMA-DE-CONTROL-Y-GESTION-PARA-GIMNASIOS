import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  isInt,
  isNotEmpty,
} from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { Plan } from '../../plan/entities/plan.entity';
// import { User } from 'mercadopago';

export class CrearPagoDto {
  /**
   * Esta es la propiedra de metodo de pago
   * @example pago en linea
   */
  @IsNotEmpty()
  @IsString()
  metodoPago: string;

  /**
   * Esta es la propiedra del plan
   * @example 1
   */
  @IsNotEmpty()
  @IsNumber()
  id_plan: number;
  /**
   * Esta es la propiedra del usuario
   * @example sfjkn15615DK
   */
  @IsNotEmpty()
  @IsUUID()
  userEmail: string;

  @IsNotEmpty()
  @IsUUID()
  id_profesor: string;

  @IsNotEmpty()
  @IsString({ each: true })
  diasSeleccionados: string[];

  @IsNotEmpty()
  horarios: string[];
}
