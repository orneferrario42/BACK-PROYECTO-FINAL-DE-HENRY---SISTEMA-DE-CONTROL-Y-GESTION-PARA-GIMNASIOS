import { ApiProperty } from '@nestjs/swagger';

import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  type: 'user' = 'user';
  @ApiProperty({
    description: 'Introduzca su correo electronico',
    example: 'ejemplo@mail.com',
  })
  // @IsNotEmpty()
  // @IsEmail()
  email: string;

  @ApiProperty({
    description: 'La contraseña debe tener al menos 8 caracteres',
    example: 'Ej3mpl0!#',
  })
  @ApiProperty()
  // @IsNotEmpty()
  password: string;
}

export class LoginProfesorDto {
  type: 'profesor' = 'profesor';
  @ApiProperty({
    description: 'Introduzca su correo electronico',
    example: 'ejemplo@mail.com',
  })
  // @IsNotEmpty()
  // @IsEmail()
  email: string;

  @ApiProperty({
    description: 'La contraseña debe tener al menos 8 caracteres',
    example: 'Ej3mpl0!#',
  })
  @ApiProperty()
  // @IsNotEmpty()
  password: string;
}
export type LoginDto = LoginUserDto | LoginProfesorDto;
