import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class ProfileUserDto {
  @ApiProperty({
    description: 'add profile  picture for the user',
    type: 'string',
    format: 'binary',
  })
  @IsString()
  @MaxLength(255)
  perfil?: string;
}
