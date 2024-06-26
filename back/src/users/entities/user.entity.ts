import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Cliente } from './customer.entity';
import { Profesor } from 'src/profesor/entities/profesor.entity';

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

  @Column({ type: 'date' })
  fecha_nacimiento: Date;

  @Column({ type: 'int' })
  numero_dni: number;

  @Column({
    type: 'enum',
    enum: ['Profesor', 'Cliente'],
    default: 'Cliente',
  })
  tipo_user: 'Profesor' | 'Cliente';

  @ManyToOne(() => Cliente, (cliente) => cliente.users)
  clientes: Cliente;

  @ManyToOne(() => Profesor, (profesor) => profesor.users)
  profesores: Profesor;
}
