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
  @IsNotEmpty()
  @IsDate()
  fecha_pago: Date;

  @IsNotEmpty()
  @IsString()
  metodoPago: string;

  @IsNotEmpty()
  @IsNumber()
  id_plan: number;

  @IsNotEmpty()
  @IsUUID()
  userEmail: string;
}
