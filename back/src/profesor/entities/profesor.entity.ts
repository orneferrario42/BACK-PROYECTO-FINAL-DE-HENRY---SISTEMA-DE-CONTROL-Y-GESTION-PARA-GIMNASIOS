import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
@Entity({ name: 'profesor' })
export class Profesor {
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
  @Column({ type: 'boolean' , default: true})
  estado: boolean;

  @OneToOne(() => User, (user) => user.rutina)
  rutina: User;

  @OneToMany(() => User, (user) => user.profesor)
  @JoinColumn({ name: 'id_users' })
  users: User[];
}
