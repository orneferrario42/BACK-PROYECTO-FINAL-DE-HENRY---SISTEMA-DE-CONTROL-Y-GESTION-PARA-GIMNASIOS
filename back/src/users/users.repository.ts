import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

export class UsersRepository {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
}
