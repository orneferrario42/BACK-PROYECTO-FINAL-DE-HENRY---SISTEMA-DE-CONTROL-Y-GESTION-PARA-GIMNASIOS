import { Inject, Injectable, NotFoundException, Search } from '@nestjs/common';
import { CreateProfesorDto } from './dto/create-profesor.dto';
import { Connection, Repository } from 'typeorm';
import { Profesor } from './entities/profesor.entity';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProfesorService {
  constructor(
    private readonly usersService: UsersService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Profesor) private readonly ProfesorRepository: Repository<Profesor>,
  ) {}
  async create(createProfesorDto: CreateProfesorDto): Promise<Profesor> {
    return this.ProfesorRepository.save(createProfesorDto)
  }

  getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getUsersById(id: string): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  async desactivarProfesor(id: string): Promise<Profesor>{
  const searchProfesor = await this.ProfesorRepository.findOneBy({id})

  if(!searchProfesor){
    throw new NotFoundException('Profesor/a no encontrado/a')
  } searchProfesor.estado = false

  return this.ProfesorRepository.save(searchProfesor)
  }
  async reactivarProfesor(id: string): Promise<Profesor>{
    const buscarProfesor = await this.ProfesorRepository.findOneBy({id})
  
    if(!buscarProfesor){
      throw new NotFoundException('Profesor/a no encontrado/a')
    } buscarProfesor.estado = true
  
    return this.ProfesorRepository.save(buscarProfesor)
    }

    async updateProfesor(id: string, updateProfesorDto: CreateProfesorDto): Promise<Profesor> {
      const updateProfesor = await this.ProfesorRepository.findOneBy({ id });
  
      if (!updateProfesor) {
        throw new NotFoundException('Profesor/a no encontrado/a');
      }
  
      return this.ProfesorRepository.save({ ...updateProfesor, ...updateProfesorDto });
    } 

}