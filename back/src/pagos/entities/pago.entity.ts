import { Cliente } from 'src/users/entities/customer.entity';
import { Column, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Plan } from './plan.entity';

export class Pago {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ type: 'date', nullable: false })
  fecha_pago: Date;

  @Column({ type: 'varchar' })
  metodo_pago: string;

  @OneToOne(() => Cliente, (cliente) => cliente.id_pago)
  clientes: Cliente;

  @OneToMany(() => Plan, (plan) => plan.pagos)
  id_plan: Plan[];
}
