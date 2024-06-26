import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Cliente } from './customer.entity';
import { Profesor } from 'src/profesor/entities/profesor.entity';
import { Role } from 'src/guards/roles.guard';

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

  @Column({default: Role.Cliente})
  tipo_user: Role;

  @ManyToOne(() => Cliente, (cliente) => cliente.users)
  clientes: Cliente;

  @ManyToOne(() => Profesor, (profesor) => profesor.users)
  profesores: Profesor;
}
