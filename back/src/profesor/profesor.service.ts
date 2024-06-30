import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
  Search,
} from '@nestjs/common';
import { CreateProfesorDto } from './dto/create-profesor.dto';
import { Connection, Repository } from 'typeorm';
import { Profesor } from './entities/profesor.entity';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { PutProfesorDto } from './dto/put-profesor.dto';

@Injectable()
export class ProfesorService {
  constructor(
    private readonly usersService: UsersService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Profesor)
    private readonly ProfesorRepository: Repository<Profesor>,
  ) {}
  async create(createProfesorDto: CreateProfesorDto): Promise<Profesor> {
    const email = createProfesorDto.email;
    const profesorExist = await this.ProfesorRepository.findOneBy({ email });
    if (profesorExist) {
      throw new HttpException('el profesor ya existe', HttpStatus.BAD_REQUEST);
    }
    const hashedPassword = await bcrypt.hash(createProfesorDto.password, 10);
    console.log(hashedPassword);

    if (!hashedPassword) {
      throw new BadRequestException('La constraseña no pudo ser hasheada');
    }

    const newProfesor = this.ProfesorRepository.save({
      ...createProfesorDto,
      password: hashedPassword,
    });

    if (newProfesor) {
      return newProfesor;
    } else {
      throw new BadRequestException('Error al agregar al nuevo profesor/a');
    }
  }

  getProfesores() {
    return this.ProfesorRepository.find();
  }

  findByEmail(email: string): Promise<Profesor> {
    return this.ProfesorRepository.findOneBy({ email: email });
  }
  getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getUsersById(id: string): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  async updateProfesor(
    id: string,
    updateProfesorDto: PutProfesorDto,
  ): Promise<Profesor> {
    const updateProfesor = await this.ProfesorRepository.findOneBy({ id });

    if (!updateProfesor) {
      throw new NotFoundException('Profesor/a no encontrado/a');
    }
    if (updateProfesor.estado === true) {
      updateProfesor.estado = false;
    }

    return this.ProfesorRepository.save({
      ...updateProfesor,
      ...updateProfesorDto,
    });
  }
}
