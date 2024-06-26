import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { User } from './user.entity';
import { Pago } from 'src/pagos/entities/pago.entity';
import { Plan } from 'src/pagos/entities/plan.entity';

@Entity({
  name: 'clientes',
})
export class Cliente {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ type: 'text' })
  routine: string;

  @OneToMany(() => User, (user) => user.clientes)
  @JoinColumn({ name: 'id_users' })
  users: User[];

  @OneToOne(() => Pago, (pago) => pago.clientes)
  @JoinColumn({
    name: 'id_pago',
  })
  id_pago: Pago;

  @OneToMany(() => Plan, (plan) => plan.clientes)
  @JoinColumn({
    name: 'id_plan',
  })
  id_plan: Plan[];
}
