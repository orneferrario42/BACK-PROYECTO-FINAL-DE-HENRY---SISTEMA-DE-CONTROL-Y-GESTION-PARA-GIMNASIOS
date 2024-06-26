import { Injectable } from '@nestjs/common';
import { CreateProfesorDto } from './dto/create-profesor.dto';
import { UpdateProfesorDto } from './dto/update-profesor.dto';
import { UpdateRutinaDto } from './dto/update-rutina.dto';

@Injectable()
export class ProfesorService {

  constructor( private readonly profesorService: ProfesorService){}
  
  private alumnos = [
    {
      id:"1",
      nombre:'Julieth',
      edad: 24,
      objetivo: 'Estética',
      rutina: 'Hipertrofia y tonificación',
      dia: 'Lunes, Miercoles, Viernes',
      horario: '18:00 a 20:00',
    },
    {
      id:"2",
      nombre:'Ornella',
      edad: 24,
      objetivo: 'Preparación deportiva',
      rutina: 'Fuerza y potencia',
      dia: 'Lunes, Miercoles, Viernes',
      horario: '21:00 a 23:00',
    }
  ];

  private profesores = [
    {
      id:"1",
      nombre:'Hernan',
      edad: 38,
      dia: 'Lunes, Martes, Miercoles, Jueves,  Viernes',
      horario: '14:00 a 17:00',
    },
    {
      id:"2",
      nombre:'Matias',
      edad: 30,
      dia: 'Lunes, Martes, Miercoles, Jueves,  Viernes',
      horario: '20:00 a 23:00',
    },
    {
      id:"3",
      nombre:'Miguel',
      edad: 38,
      dia: 'Lunes, Martes, Miercoles, Jueves,  Viernes',
      horario: '17:00 a 23:00',
    },
  ]

  create(createProfesorDto: CreateProfesorDto) {
    return this.profesores.push(createProfesorDto)
  }
  getUsers(): any[] {
    return this.alumnos;
  }

  getUsersById(id: string): any {
    return this.alumnos.find(alumno => alumno.id === id);
  }

  // updateRutina(id: string, updateRutinaDto: UpdateRutinaDto) {
  //   return this.profesorService.push();
  // }

}
