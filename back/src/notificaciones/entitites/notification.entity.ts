import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
@Entity({ 
    name: 'notifications' 
})
export class Notification {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    message: string;

    @Column()
    createdAt: Date;
    
    @Column({ default: false })
    read: boolean;

    @ManyToOne(() => User, (user) => user.notifications)
    user: User;
}