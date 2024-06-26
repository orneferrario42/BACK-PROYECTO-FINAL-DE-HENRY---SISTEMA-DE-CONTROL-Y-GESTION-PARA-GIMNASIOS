import { User } from 'src/users/entities/user.entity';
import { Column, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

export class Profesor{
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ type: 'string' })
  nombre: string;

  @Column({ type: 'number' })
  edad: number;

  @Column({ type: 'string' })
  dia: string;

  @Column({ type: 'string' })
  horario: string; 

  @Column({ type: 'string' })
  email: string;

  @Column({ type: 'string' })
  password: string;

  // @Column({ default: Role.profesor})
  // role:Role

  @OneToMany(() => User, (user) => user.profesores)
  @JoinColumn({ name: 'id_users' })
  users: User[];
}
