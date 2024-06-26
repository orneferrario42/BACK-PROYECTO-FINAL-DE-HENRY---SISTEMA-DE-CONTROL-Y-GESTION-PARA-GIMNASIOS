
import { Column, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Plan } from './plan.entity';
import { User } from 'src/users/entities/user.entity';

export class Pago {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ type: 'date', nullable: false })
  fecha_pago: Date;

  @Column({ type: 'varchar' })
  metodo_pago: string;

  @OneToOne(() => User, (user) => user.pagos)
  clientes: User;

  @OneToMany(() => Plan, (plan) => plan.pagos)
  id_plan: Plan[];
}
