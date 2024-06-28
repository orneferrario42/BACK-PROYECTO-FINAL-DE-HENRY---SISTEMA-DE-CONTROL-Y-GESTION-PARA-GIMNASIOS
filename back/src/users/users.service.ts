import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/guards/roles.enum';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  findBy(email: string) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>) {}

  async seederUser() {
    try {
      const userExists = await this.userRepository.findOneBy({
        email: 'jose@mail.com',
      });

      if (!userExists) {
        const passwordHashed = await bcrypt.hash('Hola12345@', 10);
        return await this.userRepository.save({
          name: 'Jose',
          email: 'jose@mail.com',
          password: passwordHashed,
          phone: 123456789,
          fecha_nacimiento: "12-12-1994",
          numero_dni: 12345678,
          role: Role.Admin,
        });
      }
      return;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async create(user: CreateUserDto) {
    const email = user.email;
    const userExists = await this.userRepository.findOneBy({ email });

    if (userExists) {
      throw new HttpException('El usuario ya existe', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);
    if (!hashedPassword) {
      throw new BadRequestException('La constraseña no pudo ser hasheada');
    }

    const newUser = this.userRepository.save({
      ...user,
      password: hashedPassword,
    });

    if (newUser) {
      return newUser;
    } else {
      throw new BadRequestException('Error al crear el usuario');
    }
  }

  async findAll() {
    return await this.userRepository.find({
      relations: ['profesor'],
      select: [
        'id',
        'name',
        'email',
        'phone',
        'fecha_nacimiento',
        'numero_dni',
        'role',
        'profesor',
      ],
    });
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: {
        profesor: true,
      },
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const { password, ...userWithOutPassword } = user;

    return userWithOutPassword;
  }

  async update(id: string,updateUserDto: UpdateUserDto,
  ): Promise<Partial<User>> {
    const updateUser = await this.userRepository.findOneBy({ id });
    if (!updateUser) {
      throw new NotFoundException('Usuario no encontrado');
    }

    await this.userRepository.update(id, updateUserDto);

    const { password, ...userWithOutPassword } = updateUser;

    return userWithOutPassword;
  }

  async remove(id: string) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    await this.userRepository.delete(id);
    const { password, ...userWithOutPassword } = user;
    return userWithOutPassword;
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOneBy({email: email});
    }
}
