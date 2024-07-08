import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Profesor } from 'src/profesor/entities/profesor.entity';
import { Role } from 'src/enum/roles.enum';
import { Pago } from 'src/pagos/entities/pago.entity';
import { Plan } from 'src/plan/entities/plan.entity';
import { Status } from 'src/enum/estados.enum';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  @Column({ type: 'text', nullable: true })
  perfil: string;

  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 72, nullable: true })
  password: string;

  @Column({ type: 'varchar' })
  phone: string;

  @Column()
  fecha_nacimiento: string;

  @Column({ type: 'varchar' })
  numero_dni: string;

  @Column({type: 'varchar', nullable: true})
  altura: string;

  @Column({type: 'varchar', nullable: true})
  peso: string;

  @Column({ default: Role.User })
  role: Role;
  
  @ManyToOne(() => Plan, (plan) => plan.clientes)
  plan: Plan; // Relación con el plan seleccionado
  
  @ManyToOne(() => Profesor, (profesor) => profesor.users)
  profesor: Profesor;
  
  @Column('varchar', { default: [] })
  diasSeleccionados: string[];

  @Column('varchar', { default: [] })
  horario: string[];

  @Column({ type: 'varchar', nullable: true, default: [] })
  objetivo: string[];

  @Column({ type: 'text', nullable: true })
  rutina: string;

  @Column({ default: true })
  estado: boolean;

  @Column({ nullable: true })
  nivelActividad: string; 
  
  // @OneToOne(() => Profesor, (profesor) => profesor.rutina)
  // @JoinColumn({ name: 'rutina' })
  // rutina: Profesor;

  @OneToMany(() => Pago, (pago) => pago.clientes)
  pagos: Pago;
}
