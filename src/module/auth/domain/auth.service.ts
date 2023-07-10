import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { LoginOutputDto } from "../../user/domain/user.output.dto";
import { LoginDto } from "../api/auth.dto";
import * as bcrypt from 'bcrypt';
import { AUTH_REPOSITORY, AuthRepository } from "./auth.repository";

@Injectable()
export class AuthService {
    // 로그인 , 회원가입 등은 건너뛴다.(auth guard 만 구현)
    constructor(
      @Inject(AUTH_REPOSITORY)
      private readonly authRepository: AuthRepository,
      private jwtService: JwtService
    ) {}


    async login(loginDto: LoginDto): Promise<LoginOutputDto> {
        const { account, password } = loginDto;
        const user = await this.authRepository.findOneByUserAccount(account);
        if (!user) {
            throw new UnauthorizedException('로그인에 실패하였습니다.');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new UnauthorizedException('로그인에 실패하였습니다.');
        }
        const payload = { userId: user.id };
        const accessToken = this.jwtService.sign({ payload },{ secret: process.env.JWT_SECRET_KEY, expiresIn: '600s' });
        return {
            accessToken,
        };
    }

    async validateUser(userId: number): Promise<any> {
        const user = await this.authRepository.findOneByUserId(userId);
        if (user) {
            return user;
        }
        return null;
    }
}