import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepositoryImpl } from './user.db';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { USER_REPOSITORY } from './user.repository';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule],
  providers: [
    {
      provide: USER_REPOSITORY,
      useClass: UserRepositoryImpl,
    },
    UserService,
  ],
  controllers: [UserController],
  exports: [
    {
      provide: USER_REPOSITORY,
      useClass: UserRepositoryImpl,
    },
  ]
})
export class UserModule {}
