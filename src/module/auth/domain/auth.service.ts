import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from '../../user/domain/user.service'
import { JwtService } from '@nestjs/jwt';
import { LoginOutputDto } from "../../user/domain/user.output.dto";
import { LoginDto } from "../api/auth.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    // 로그인 , 회원가입 등은 건너뛴다.(auth guard 만 구현)
    constructor(
      private userService: UserService,
      private jwtService: JwtService
    ) {}


    async login(loginDto: LoginDto): Promise<LoginOutputDto> {
        const { account, password } = loginDto;
        const user = await this.userService.findOneByUserAccount(account);
        if (!user) {
            throw new UnauthorizedException('로그인에 실패하였습니다.');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new UnauthorizedException('로그인에 실패하였습니다.');
        }
        const payload = { userId: user.id };
        const accessToken = this.jwtService.sign(payload);
        return {
            accessToken,
        };
    }

    async validateUser(userId: number): Promise<any> {
        const user = await this.userService.findOneByUserId(userId);
        if (user) {
            return user;
        }
        return null;
    }
}