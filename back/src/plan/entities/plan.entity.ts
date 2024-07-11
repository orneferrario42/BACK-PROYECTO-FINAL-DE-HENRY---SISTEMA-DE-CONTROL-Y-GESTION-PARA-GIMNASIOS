import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Pago } from '../../pagos/entities/pago.entity';
import { User } from 'src/users/entities/user.entity';
@Entity({ name: 'planes' })
export class Plan {
  @PrimaryColumn('int', { name: 'id' })
  id: number;

  @Column({ type: 'varchar', nullable: false, length: 46 })
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @ManyToOne(() => User, (user) => user.plan)
  clientes: User[];

  @ManyToOne(() => Pago, (pago) => pago.id_plan, {
    nullable: true,
  })
  pagos: Pago[];
}
