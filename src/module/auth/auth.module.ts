import { Module } from '@nestjs/common';
// import { JwtStrategy  } from './passport/jwt.passport';
// import { JwtAuthGuard } from './auth.guard';
import { AuthService } from './domain/auth.service';
import { jwtConstants } from './constants';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from "@nestjs/jwt";
import { AuthController } from './api/auth.controller';
import { UserService } from "../user/domain/user.service";
import { UserModule } from "../user/user.module";
import { JwtAuthGuard } from "./auth.jwtAuthGuard";

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, JwtAuthGuard, JwtService /*???? 왜 JwtService랑 UserService 를 여기에 또 export 해야하는건데*/],
  controllers: [AuthController],
  exports: [AuthService, JwtAuthGuard, JwtService]
})
export class AuthModule {}
