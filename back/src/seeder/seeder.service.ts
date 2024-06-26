import { Injectable, OnModuleInit } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';


@Injectable()
export class SeederService implements OnModuleInit {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  async onModuleInit() {
    console.log('Running Seeder...');
    await this.usersService.seederUser();
  }
}