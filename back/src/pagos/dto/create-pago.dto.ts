import { IsDate, IsNotEmpty, IsNumber, IsString, IsUUID, isNotEmpty } from 'class-validator';
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
  @IsUUID()
  id_plan: string;

  @IsNotEmpty()
  @IsUUID()
  userEmail: string;
}
