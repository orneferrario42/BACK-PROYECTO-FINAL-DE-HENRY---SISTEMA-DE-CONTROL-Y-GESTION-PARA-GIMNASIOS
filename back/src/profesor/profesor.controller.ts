import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ProfesorService } from './profesor.service';
import { CreateProfesorDto } from './dto/create-profesor.dto';
import { Profesor } from './entities/profesor.entity';
import { User } from 'src/users/entities/user.entity';

@Controller('profesor')
export class ProfesorController {
  constructor(private readonly profesorService: ProfesorService) {}

  @Get('users')
  async getUsers(): Promise<User[]> {
    return await this.profesorService.getUsers();
  }

  @Get('users/:id')
getUsersById(@Param('id') id: string) {
    return this.profesorService.getUsersById(id);
  }

  @Post()
  createProfesor(@Body() createProfesorDto:CreateProfesorDto): Promise<Profesor>{
    return this.profesorService.create(createProfesorDto);

  }


}
