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
import {  Repository } from 'typeorm';
import { Profesor } from './entities/profesor.entity';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { PutProfesorDto } from './dto/put-profesor.dto';
import { Status } from 'src/enum/estados.enum';

@Injectable()
export class ProfesorService {
  constructor(
    private readonly usersService: UsersService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Profesor)
    private readonly profesorRepository: Repository<Profesor>,
  ) {}
  async create(createProfesorDto: CreateProfesorDto): Promise<Profesor> {
    const email = createProfesorDto.email;
    const profesorExist = await this.profesorRepository.findOneBy({ email });
    if (profesorExist) {
      throw new HttpException('el profesor ya existe', HttpStatus.BAD_REQUEST);
    }
    const hashedPassword = await bcrypt.hash(createProfesorDto.password, 10);
    console.log(hashedPassword);
    
    if (!hashedPassword) {
      throw new BadRequestException('La constraseña no pudo ser hasheada');
    }
    
    const newProfesor = this.profesorRepository.save({
      ...createProfesorDto,
      password: hashedPassword,
    });
    
    if (newProfesor) {
      return newProfesor;
    } else {
      throw new BadRequestException('Error al agregar al nuevo profesor/a');
    }
  }
  
  async updateState(id: string) {
    const profesor = await this.userRepository.findOneBy({ id });
    if (!profesor) {
      throw new NotFoundException('Usuario no encontrado');
    }
    
    // Alternar el estado del profesor
    profesor.estado = profesor.estado === true ? false : true;

    await this.userRepository.save(profesor); // Asegúrate de esperar el guardado

    const { password, ...userWithOutPassword } = profesor;
    return userWithOutPassword;
  }

  getProfesores() {
    return this.profesorRepository.find();
  }

  findByEmail(email: string): Promise<Profesor> {
    return this.profesorRepository.findOneBy({ email: email });
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
    const updateProfesor = await this.profesorRepository.findOneBy({ id });

    if (!updateProfesor) {
      throw new NotFoundException('Profesor/a no encontrado/a');
    }
    if (updateProfesor.estado === true) {
      updateProfesor.estado = false;
    } else {
      updateProfesor.estado = true;
    }

    return this.profesorRepository.save({
      ...updateProfesor,
      ...updateProfesorDto,
    });
  }
}
