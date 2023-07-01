import { Injectable } from '@nestjs/common';
import { UserService } from  '../user/domain/user.service'
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
    // 로그인 , 회원가입 등은 건너뛴다.(auth guard 만 구현)
    constructor(
      private usersService: UserService,
      private jwtService: JwtService
    ) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        if (user && user.password === pass) {
            const { password, ...result } = user;

            // result는 password 를 제외한 user의 모든 정보를 포함한다.
            return result;
        }
        return null;
    }
}