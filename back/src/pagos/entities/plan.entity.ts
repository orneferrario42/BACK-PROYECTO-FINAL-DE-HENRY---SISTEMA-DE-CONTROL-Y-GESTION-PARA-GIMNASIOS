import { Cliente } from 'src/users/entities/customer.entity';
import { Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Pago } from './pago.entity';

export class Plan {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ type: 'varchar', nullable: false, length: 46 })
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @ManyToOne(() => Cliente, (cliente) => cliente.id_plan)
  clientes: Cliente;

  @ManyToOne(() => Pago, (pago) => pago.id_plan)
  pagos: Pago;
}
