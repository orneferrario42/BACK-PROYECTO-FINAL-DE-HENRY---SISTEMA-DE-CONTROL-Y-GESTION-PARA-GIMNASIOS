import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Profesor } from 'src/profesor/entities/profesor.entity';
import { Role } from 'src/guards/roles.enum';
import { Pago } from 'src/pagos/entities/pago.entity';
import { Plan } from 'src/pagos/entities/plan.entity';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 72, nullable: false })
  password: string;

  @Column({ type: 'int' })
  phone: number;

  @Column()
  fecha_nacimiento: string;

  @Column({ type: 'int' })
  numero_dni: number;

  @Column({ default: Role.User })
  role: Role;

  @ManyToOne(() => Profesor, (profesor) => profesor.users)
  profesores: Profesor;

  @Column({ default: 'default_image_url' })
  rutina: string;

  @OneToMany(() => Pago, (pago) => pago.clientes)
  pagos: Pago[];

  @ManyToOne(() => Plan, (plan) => plan.clientes)
  plan: Plan; // Relación con el plan seleccionado

  @Column('varchar',{ default: [] })
  diasSeleccionados: string[];
}
