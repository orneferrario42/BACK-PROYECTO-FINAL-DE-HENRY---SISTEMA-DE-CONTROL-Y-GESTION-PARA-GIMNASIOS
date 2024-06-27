import { Plan } from "src/pagos/entities/plan.entity";
import { Profesor } from "src/profesor/entities/profesor.entity";

export class CreateUserDto {
  name: string;
  email: string;
  fecha_nacimiento: string;
  phone: number;
  numero_dni: number;
  profesor: Profesor;
  plan: Plan;
  diaSeleccionado: string[]
  password: string;
  confirmPassword: string;
}
