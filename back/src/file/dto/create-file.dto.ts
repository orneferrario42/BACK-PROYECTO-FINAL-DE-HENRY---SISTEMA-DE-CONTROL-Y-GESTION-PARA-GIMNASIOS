import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class CreateFileDto {
  /**
   * Esta es la propiedad rutina
   *@example imag.png
   */
  @ApiProperty({
    description: 'add an image',
    type: 'string',
    format: 'binary',
  })
  @IsString()
  @MaxLength(255)
  rutina?: string;
}
