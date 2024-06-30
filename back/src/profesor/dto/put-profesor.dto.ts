import {
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class PutProfesorDto {
  /**Enesta propiedra el usuario profesor puede  modificar el horario */
  @IsOptional()
  @IsString()
  dia: string[];
  /**Enesta propiedra el usuario profesor puede  modificar el horario */
  @IsOptional()
  @IsString()
  horario: string[];

  /**en esta propiedra el usuario puede cambiar su contraseña */
  @IsOptional()
  @MinLength(8)
  @MaxLength(15)
  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).*$/, {
    message:
      'Password invalida. Debe contener al menos una mayuscula, una minuscula, un numero y un caracter especial (!@#$%^&*)',
  })
  password: string;
}
