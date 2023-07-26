import { Inject, Injectable } from '@nestjs/common';
import { DataFactory, FactoryValue, Seeder } from 'nestjs-seeder';
import { USER_REPOSITORY, UserRepository } from './domain/user.repository';
import { UserEntity } from './data/user.entity';

@Injectable()
export class UserSeeder implements Seeder {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  seed(): Promise<any> {
    const users = DataFactory.createForClass(UserEntity).generate(50);

    return this.userRepository.createMany(users);
  }
  drop(): Promise<any> {
    return this.userRepository.deleteAll();
  }
}
