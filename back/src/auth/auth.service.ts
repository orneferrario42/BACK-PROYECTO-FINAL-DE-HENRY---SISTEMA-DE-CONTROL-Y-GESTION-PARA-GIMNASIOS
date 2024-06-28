import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/LoginUserDto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { ProfesorService } from 'src/profesor/profesor.service';



@Injectable()
export class AuthService {
  
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  /**LOGICA DE LOGIN*/
  async signIn(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    const emailUser = await this.usersService.findByEmail(email);
    if (!emailUser) {
      throw new Error('Credenciales incorrectas');
    }

    const isPasswordValid = await bcrypt.compare(password, emailUser.password);
    if (!isPasswordValid) {
      throw new Error('Credenciales incorrectas');
    }

    const payload = { id: emailUser.id, email: emailUser.email, role: emailUser.role };
    const token = this.jwtService.sign(payload);

    return {
      success: 'Inicio de sesión exitoso',
      TuToken: token
    };
  }





}