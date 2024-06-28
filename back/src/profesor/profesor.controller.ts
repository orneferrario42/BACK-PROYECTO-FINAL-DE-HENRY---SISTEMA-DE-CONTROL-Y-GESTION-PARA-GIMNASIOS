import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { ProfesorService } from './profesor.service';
import { CreateProfesorDto } from './dto/create-profesor.dto';
import { Profesor } from './entities/profesor.entity';
import { User } from 'src/users/entities/user.entity';
import { RolesGuard } from 'src/guards/roles.guard';
import { Role } from 'src/guards/roles.enum';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('profesor')
// @UseGuards(RolesGuard)
export class ProfesorController {
  constructor(private readonly profesorService: ProfesorService) {}

@Get('profesores')
  async getAllProfesores(): Promise<Profesor[]> {
    return await this.profesorService.getProfesores();
}

  
@Get('users')
// @Roles(Role.Profesor)
  async getUsers(): Promise<User[]> {
    return await this.profesorService.getUsers();
  }

  @Get('users/:id')
  // @Roles(Role.Profesor)
getUsersById(@Param('id') id: string) {
    return this.profesorService.getUsersById(id);
  }

  @Post()
  // @Roles(Role.Admin)
  async createProfesor(@Body() createProfesorDto:CreateProfesorDto): Promise<string |Omit<Profesor, 'id'|'edad'| 'dia'| 'horario'| 'email'| 'password'>> { 
    return await this.profesorService.create(createProfesorDto).then(crearProfesor =>{
      return `Se ha agregado al profesor/a ${crearProfesor.nombre} correctamente`;
    });
  }

  @Put(':id')
  // @Roles(Role.Admin)
async desactivarProfesor(@Param('id') id: string){
await this.profesorService.desactivarProfesor(id)
  return `Se ha desactivado al profesor/a ${id} satisfactoriamente`
}

@Put(':id')
// @Roles(Role.Admin)
async reactivarProfesor(@Param('id') id: string){
  await this.profesorService.reactivarProfesor(id)
    return `Se ha reactivado al profesor/a ${id} satisfactoriamente`
}

@Put(':id')
// @Roles(Role.Admin)
async updateProfesor(id: string, updateProfesorDto: CreateProfesorDto): Promise<Profesor> {
  return this.profesorService.updateProfesor(id, updateProfesorDto);
}
}
