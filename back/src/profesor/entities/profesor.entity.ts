import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
@Entity({name:'profesores'})
export class Profesor{
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ type: 'varchar' })
  nombre: string;

  @Column({ type: 'int' })
  edad: number;

  @Column({ type: 'varchar' })
  dia: string;

  @Column({ type: 'varchar' })
  horario: string; 

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  // @Column({ default: Role.profesor})
  // role:Role
  // Some comentary

  @OneToMany(() => User, (user) => user.profesores)
  @JoinColumn({ name: 'id_users' })
  users: User[];
}
