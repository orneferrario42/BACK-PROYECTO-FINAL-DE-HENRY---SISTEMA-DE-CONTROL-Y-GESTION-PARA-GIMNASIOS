import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid, v4 } from 'uuid';
import { Pago } from '../../pagos/entities/pago.entity';
import { User } from 'src/users/entities/user.entity';
import { UUID } from 'crypto';
@Entity({ name: 'planes' })
export class Plan {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ type: 'varchar', nullable: false, length: 46 })
  name: string;
  
  @Column ({ type: 'int', nullable: true})
  plan: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @ManyToOne(() => User, (user) => user.plan)
  clientes: User[];

  @ManyToOne(() => Pago, (pago) => pago.id_plan, {nullable: true})
  pagos: Pago[];
}
