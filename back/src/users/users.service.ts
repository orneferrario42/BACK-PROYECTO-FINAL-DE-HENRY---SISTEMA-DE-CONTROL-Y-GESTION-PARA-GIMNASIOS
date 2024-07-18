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
import { And, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/enum/roles.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { Status } from 'src/enum/estados.enum';
import { Profesor } from 'src/profesor/entities/profesor.entity';
import { Plan } from 'src/plan/entities/plan.entity';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Plan)
    private planRepository: Repository<Plan>,
    @InjectRepository(Profesor)
    private profesorRepository: Repository<Profesor>,
  ) {}

  async seederUser() {
    try {
      const userExists = await this.userRepository.findOneBy({
        email: 'jose@mail.com',
      });

      if (!userExists) {
        const passwordHashed = await bcrypt.hash('Hola12345@', 10);
        const newUser = this.userRepository.create({
          name: 'Jose',
          email: 'jose@mail.com',
          password: passwordHashed,
          phone: '123456789',
          fecha_nacimiento: '12-12-1994',
          numero_dni: '12345678',
          altura: '1.75',
          peso: ['70'],
          role: Role.Admin,
          estado: true,
        });
        return await this.userRepository.save(newUser);
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

    const newUser = this.userRepository.create({
      ...user,
      password: hashedPassword,
      estado: false
    });

    const savedUser = await this.userRepository.save(newUser);

    if (savedUser) {
      return savedUser;
    } else {
      throw new BadRequestException('Error al crear el usuario');
    }
  }

  async findAll(page: number, limit: number): Promise<User[]> {
    const users = await this.userRepository.find({
      relations: ['profesor', 'plan', 'pagos'],
      select: [
        'id',
        'name',
        'email',
        'phone',
        'fecha_nacimiento',
        'numero_dni',
        'role',
        'estado',
        'profesor',
        'altura',
        'peso',
        'nivelActividad',
        'plan',
        'horario',
        'objetivo',
        'metodoPago',
        'rutina',
        'pagos',
        'diasSeleccionados',
      ],
      take: limit,
      skip: (page - 1) * limit,
    });

    return users;
  }

  async getMetadata(limit: number) {
    const totalUsers = await this.userRepository.count();
    const totalUserActives = await this.userRepository.count({
      where: { estado: true },
    });
    const totalUserInactives = await this.userRepository.count({
      where: { estado: false },
    });

    const totalPages = Math.ceil(totalUsers / limit);

    const metadata = {
      totalUsers,
      totalPages,
      totalUserActives,
      totalUserInactives,
    };

    return metadata;
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: {
        profesor: true,
        plan: true,
        pagos: true,
      },
      select: [
        'id',
        'name',
        'email',
        'phone',
        'fecha_nacimiento',
        'numero_dni',
        'role',
        'estado',
        'profesor',
        'altura',
        'peso',
        'nivelActividad',
        'plan',
        'horario',
        'objetivo',
        'metodoPago',
        'rutina',
        'pagos',
        'diasSeleccionados',
      ],
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const { password, ...userWithOutPassword } = user;

    return userWithOutPassword;
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<Partial<User>> {
    const updateUser = await this.userRepository.findOne({
      where: { id },
    });

    if (!updateUser) {
      throw new NotFoundException('Usuario no encontrado');
    }
    if (updateUserDto.plan) {
      const plan = await this.planRepository.findOne({
        where: { id: updateUserDto.plan as unknown as number },
      });
      if (!plan) {
        throw new NotFoundException('Plan no encontrado');
      }
      updateUserDto.plan = plan;
    }

    if (updateUserDto.id_profesor) {
      const profesor = await this.profesorRepository.findOne({
        where: { id: updateUserDto.id_profesor},
      });
      if (!profesor) {
        throw new BadRequestException('Profesor no encontrado');
      }
      updateUser.profesor = profesor;
    }

    await this.userRepository.update(id, updateUserDto);

    const updatedUser = await this.userRepository.findOne({
      where: { id },
      relations: ['plan', 'profesor'],
    });

    const { password, ...userWithOutPassword } = updatedUser;

    return userWithOutPassword;
  }

  async updateState(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    if (user.estado === true) {
      user.estado = false;
    } else {
      user.estado = true;
    }

    await this.userRepository.save(user);

    const { password, ...userWithOutPassword } = user;

    return userWithOutPassword;
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOneBy({ email: email });
  }

  async findUserByEmail(emailUser: string): Promise<boolean> {
    const userExist = await this.userRepository.findOneBy({ email: emailUser });
    if (!userExist) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return true;
  }

  async generaqr(id: string) {
    const dataqr = await this.userRepository.findOne({ where: { id: id } });
    if (!dataqr) {
      return 'No existen Usuario Con Este Id';
    }
    const str = JSON.stringify(dataqr.diasSeleccionados);
    const regex = /[^A-Za-z,]/g;
    const filteredString = str.replace(regex, '').slice(0);
    const dias = filteredString.split(',');

    const daysOfWeek = [
      'Domingo',
      'Lunes',
      'Martes',
      'Miercoles',
      'Jueves',
      'Viernes',
      'Sabado',
    ];
    const today = new Date();
    const dayNumber = today.getDay();
    const pago = dataqr.estado;
    const diaHoy = daysOfWeek[dayNumber];
    let valido = false;
    dias.forEach((d) => {
      console.log(d + ' === ' + diaHoy);
      if (d.trim() === diaHoy) {
        valido = true;
      }
    });
    console.log(valido);
    const Json = {
      id: dataqr.id,
      name: dataqr.name,
      email: dataqr.email,
      dni: dataqr.numero_dni,
      estado: dataqr.estado,
      plan: dias,
      fecha_nacimiento: dataqr.fecha_nacimiento,
      horario: dataqr.horario,
    }
    return Json
  }
}
