import { Module } from '@nestjs/common';
import { JwtService } from './jwt/jwt.service';
import { PassportService } from './passport/passport.service';
import { GuardService } from './guard/guard.service';
import { UserService } from './user/user.service';

@Module({
  providers: [JwtService, PassportService, GuardService, UserService]
})
export class AuthModule {}
