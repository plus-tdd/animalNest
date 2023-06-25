import { Module } from '@nestjs/common';
import { JwtStrategy  } from './passport/auth.passport';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Module({
  providers: [JwtStrategy , AuthGuard, AuthService]
})
export class AuthModule {}
