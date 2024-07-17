import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/LoginUserDto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { ProfesorService } from 'src/profesor/profesor.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly profesorService: ProfesorService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.usersService.findByEmail(email);
    const profesor = await this.profesorService.findByEmail(email);

    const validEntity = user || profesor;

    if (!validEntity) {
      console.error(`Usuario no encontrado: ${email}`);
      throw new BadRequestException('Credenciales incorrectas');
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      validEntity.password,
    );
    if (!isPasswordValid) {
      console.error('Contraseña incorrecta');
      throw new BadRequestException('Credenciales incorrectas');
    }
    console.log('Usuario autenticado correctamente');

    const payload = {
      id: validEntity.id,
      email: validEntity.email,
      role: validEntity.role,
    };

    const token = this.jwtService.sign(payload);

    return {
      success: 'Inicio de sesión exitoso',
      token,
      user: validEntity.role, 
      id: validEntity.id
    };
  }
}