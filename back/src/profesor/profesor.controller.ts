import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ProfesorService } from './profesor.service';
import { CreateProfesorDto } from './dto/create-profesor.dto';
import { UpdateProfesorDto } from './dto/update-profesor.dto';

@Controller('profesor')
export class ProfesorController {
  constructor(private readonly profesorService: ProfesorService) {}

  @Get('users')
  getUsers(): any[]{
    return this.profesorService.getUsers();
  }

  @Get('users/:id')
getUsersById(@Param('id') id: string) {
    return this.profesorService.getUsersById(id);
  }

  @Post()
  createProfesor(@Body() createProfesorDto:CreateProfesorDto){
    return this.profesorService.create(createProfesorDto);

  }
  // @Put('users/:id')
  // updateRutina(@Param('id') id: string, @Body('rutina') newRuttine: string) {
  //   return this.profesorService.updateRutina(id, newRuttine);
  // }


}
