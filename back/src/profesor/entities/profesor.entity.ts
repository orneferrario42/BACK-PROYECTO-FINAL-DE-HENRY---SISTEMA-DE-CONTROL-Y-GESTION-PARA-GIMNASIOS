import { User } from 'src/users/entities/user.entity';
import { Column, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

export class Profesor{
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ type: 'int' })
  disponibilidad: number; // cantidad de horas disponibles al dia

  @OneToMany(() => User, (user) => user.profesores)
  @JoinColumn({ name: 'id_users' })
  users: User[];
}
