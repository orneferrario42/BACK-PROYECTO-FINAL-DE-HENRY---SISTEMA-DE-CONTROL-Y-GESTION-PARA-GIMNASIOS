import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class ProfileProfesorDto {
  @ApiProperty({
    description: 'add profile  picture for the professor',
    type: 'string',
    format: 'binary',
  })
  @IsString()
  @MaxLength(255)
  perfil?: string;
}
