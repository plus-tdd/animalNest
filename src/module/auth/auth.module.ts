import { Module } from '@nestjs/common';
import { AuthService } from './domain/auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthController } from './api/auth.controller';
import { JwtAuthGuard } from './auth.jwtAuthGuard';
import { AUTH_REPOSITORY } from './domain/auth.repository';
import { AuthRepositoryImpl } from './data/auth.db';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/data/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [
    AuthService,
    {
      provide: AUTH_REPOSITORY,
      useClass: AuthRepositoryImpl,
    },
    JwtAuthGuard,
    JwtService,
  ],
  controllers: [AuthController],
  exports: [
    AuthService,
    {
      provide: AUTH_REPOSITORY,
      useClass: AuthRepositoryImpl,
    },
    JwtAuthGuard,
    JwtService,
  ],
})
export class AuthModule {}
