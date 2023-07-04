import { Module } from '@nestjs/common';
import { UserService } from './domain/user.service';
import { UserController } from './api/user.controller';
import { UserRepositoryImpl } from './data/user.db';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { USER_REPOSITORY } from './domain/user.repository';
import { UserEntity } from './data/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    AuthModule
  ],
  providers: [
    {
      provide: USER_REPOSITORY,
      useClass: UserRepositoryImpl,
    },
    UserService,
  ],
  controllers: [UserController],
  exports: [
    UserService,
    {
      provide: USER_REPOSITORY,
      useClass: UserRepositoryImpl,
    },
  ]
})
export class UserModule {}
