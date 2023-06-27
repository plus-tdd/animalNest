import { Module } from '@nestjs/common';
import { JwtStrategy  } from './passport/jwt.passport';
import { JwtAuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [JwtStrategy , JwtAuthGuard, AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
