import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Plan } from '../../plan/entities/plan.entity';
import { User } from 'src/users/entities/user.entity';
@Entity({ name: 'pagos' })
export class Pago {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ type: 'date', nullable: false })
  fecha_pago: Date;

  @Column({ type: 'varchar' })
  metodopago: string;

  // @OneToOne(() => User, (user) => user.pagos, {
  //   cascade: true,
  // })
  
  @ManyToOne(() => User, (user) => user.pagos)
  clientes: User;

  @ManyToOne(() => Plan, (plan) => plan.pagos)
  id_plan: Plan;
}
