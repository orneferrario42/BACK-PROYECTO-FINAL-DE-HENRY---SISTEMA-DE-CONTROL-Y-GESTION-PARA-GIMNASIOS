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
    const { type, email, password } = loginDto;

    if (type === 'user') {
      console.log(`Buscando usuario con email: ${email}`);
      const user = await this.usersService.findByEmail(email);
      if (!user) {
        console.error(`Usuario no encontrado: ${email}`);
        throw new BadRequestException('Credenciales incorrectas user');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        console.error('Contraseña incorrecta');
        throw new BadRequestException('Credenciales incorrectas password');
      }

      console.log('Usuario autenticado correctamente');
      const payload = { id: user.id, email: user.email, role: user.role };
      const token = this.jwtService.sign(payload);
      return { success: 'Inicio de sesión exitoso', token, user: user.role };
    } else if (type === 'profesor') {
      console.log(`Buscando profesor con email: ${email}`);
      const profesor = await this.profesorService.findByEmail(email);
      if (!profesor) {
        console.error(`Profesor no encontrado: ${email}`);
        throw new BadRequestException('Credenciales incorrectas');
      }

      const isPasswordValid = await bcrypt.compare(password, profesor.password);
      if (!isPasswordValid) {
        console.error('Contraseña incorrecta');
        throw new BadRequestException('Credenciales incorrectas');
      }

      console.log('Profesor autenticado correctamente');
      const payload = {
        id: profesor.id,
        email: profesor.email,
        role: profesor.role,
      };
      const token = this.jwtService.sign(payload);
      return { success: 'Inicio de sesión exitoso', token };
    } else {
      throw new BadRequestException('Login no reconocido');
    }
  }
}