import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProfesorService } from './profesor.service';
import { CreateProfesorDto } from './dto/create-profesor.dto';
import { Profesor } from './entities/profesor.entity';
import { User } from 'src/users/entities/user.entity';
import { RolesGuard } from 'src/guards/roles.guard';
import { Role } from 'src/enum/roles.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { PutProfesorDto } from './dto/put-profesor.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
@ApiTags('PROFESOR')
@ApiBearerAuth()
@Controller('profesor')
// @UseGuards(RolesGuard, AuthGuard)
export class ProfesorController {
  constructor(private readonly profesorService: ProfesorService) {}

  /**
   * Este metodo le permite al administrador ver todos los profesores que tiene.
   */
  @Get('profesores')
  // @Roles(Role.Admin)
  async getAllProfesores(): Promise<Profesor[]> {
    return await this.profesorService.getProfesores();
  }

  /**
   * Este metodo le permite al profesor ver los usuarios del gimnasio que estan inscriptos en su clase.
   */
@Get('users')
@Roles(Role.Profesor,Role.Admin)
  async getUsers(): Promise<User[]> {
    return await this.profesorService.getUsers();
  }


  @Get(':id')
  updateStatus(@Param('id') id: string){
    return this.profesorService.updateState(id);
  }

  /**
   *  Este metodo permite al usuario  profesor ver a un usuario del gimnasio.
   */
  @Get('users/:id')
  // @Roles(Role.Profesor)
  getUsersById(@Param('id') id: string) {
    return this.profesorService.getUsersById(id);
  }

  /**
   * Este metodo le permie al administrador crear un usuario profesor.
   */
  @Post('create')
  // @Roles(Role.Admin)
  async createProfesor(@Body() createProfesorDto: CreateProfesorDto) {
    const createdProfesor =
      await this.profesorService.create(createProfesorDto);
    return {
      message: `Se ha agregado al profesor/a ${createdProfesor.nombre} correctamente`,
      data: createdProfesor,
    };
  }

  /**
   *Este metodo le permite al usuario profesor modifica su informacion personal.
   */
  @Put(':id')
  // @Roles(Role.Admin)
  async updateProfesor(
    id: string,
    updateProfesorDto: PutProfesorDto,
  ): Promise<Profesor> {
    return this.profesorService.updateProfesor(id, updateProfesorDto);
  }
}
