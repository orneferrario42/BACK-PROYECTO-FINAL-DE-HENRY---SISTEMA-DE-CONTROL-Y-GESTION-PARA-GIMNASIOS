import {BadRequestException,Body,Controller,Get,HttpException,HttpStatus,Post,} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from './dto/LoginUserDto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';


@ApiTags('SignIn')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


/**SOLICITUD SIGING */
  @Post('signin')
  signIn(@Body() loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
return  this.authService.signIn(loginUserDto);
  
  }
}