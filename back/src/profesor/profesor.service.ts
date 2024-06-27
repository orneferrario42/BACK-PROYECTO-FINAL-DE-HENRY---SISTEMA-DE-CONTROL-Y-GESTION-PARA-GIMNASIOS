import { Inject, Injectable } from '@nestjs/common';
import { CreateProfesorDto } from './dto/create-profesor.dto';
import { Connection, Repository } from 'typeorm';
import { Profesor } from './entities/profesor.entity';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class ProfesorService {
  constructor(
    private connection: Connection,
    private readonly usersService: UsersService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,) {}
  
  
    async create(createProfesorDto: CreateProfesorDto): Promise<Profesor> {
    const { nombre, edad, dia, horario, email, password } = createProfesorDto;
    const tableProfesor = this.connection.createQueryRunner();
    await tableProfesor.connect();
    await tableProfesor.startTransaction();
    try {
        const query = `INSERT INTO profesor (nombre, edad, dia, horario, email, password)
        VALUES  ($1, $2,$3, $4, $5, $6)
        RETURNING *`;

        const params = [nombre, edad, dia, horario,email, password];

      const result = await tableProfesor.query(query, params);
      const createdProfesor = result[0];

      await tableProfesor.commitTransaction();

      return createdProfesor;
    } catch (error) {
      await tableProfesor.rollbackTransaction();
      throw error;
    } finally {
      await tableProfesor.release();
    }
  }
  
  getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getUsersById(id: string): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }
}

