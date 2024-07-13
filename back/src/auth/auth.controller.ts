import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/LoginUserDto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@ApiTags('SINGIN')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Este metodo permite a los usuarios iniciar seccion
   * */

  @Post('signin')
  signIn(@Body() loginUserDto: LoginDto) {
    return this.authService.signIn(loginUserDto);
  }
}
