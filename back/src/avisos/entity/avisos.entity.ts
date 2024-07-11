import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'avisos'
})
export class Avisos {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  message: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;

  @Column({ type: 'timestamp', nullable:  true })
  expiresAt: Date;

  @ManyToOne(() => User, (user) => user.avisos)
  @JoinColumn({ name: 'userId' })
  user: User;
}