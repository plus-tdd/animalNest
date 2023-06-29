import { Injectable,UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InvalidUserInfoError } from "./user.error";
import { LoginuserIdDto, UserIdDto, SignUpDto,UserAccountDto } from "./user.dto";
import {LoginOutputDto , UserOutPutDto} from "./user.output.dto"
import { UserRepositoryImpl } from "./user.db";
// 예제에서는 하드 코딩 되었지만
// 이 부분은 반드시 user entity를 표현하는 class/interface여야 한다.

@Injectable()
export class UserService {

    constructor(private readonly userRepository: UserRepositoryImpl, private readonly jwtService: JwtService) {}



    async findOneByUserId(userIdDto: UserIdDto): Promise<UserOutPutDto> {
        // userId 에 대한 검증은 끝났다고 가정함
        return this.userRepository.findOneByUserId(userIdDto);
    }

    async findOneByUserAccount(userAccountDto: UserAccountDto): Promise<UserOutPutDto> {
        // userId 에 대한 검증은 끝났다고 가정함
        return this.userRepository.findUserByAccount(userAccountDto);
    }

    async login(loginUserIdDto: LoginuserIdDto): Promise<LoginOutputDto> {
        const { account, password } = loginUserIdDto;
        const user = await this.userRepository.findUserByAccount({ account });
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

    async signUp(signUpDto : SignUpDto): Promise<boolean> {
        // null, undefined, 다른 타입 등은 이미 프론트와 컨트롤러에서 걸러졌다고 가정한다.
        // "" 이나 음수 등을 검증한다
        this.validateSignUpDto(signUpDto)
        const { account, userName, password, phoneNumber } = signUpDto;
        const hashedPassword = await bcrypt.hash(password, 10);
        // 성공여부를 받는다. boolean
        return await this.userRepository.signUp({ account, userName, password: hashedPassword, phoneNumber })
    }

    private validateSignUpDto(signUpDto: SignUpDto) {
        const {account, userName, password, phoneNumber } = signUpDto;
        // 1. 빈값이면 안됨.
        if (account === "") throw new InvalidUserInfoError("아이디")
        if (userName === "") throw new InvalidUserInfoError("이름")
        if (password === "") throw new InvalidUserInfoError("비밀번호")
        if (phoneNumber === "") throw new InvalidUserInfoError("휴대폰 번호")
        // 2. 음수여서는 안됨.
        // 없네 ㅋ
    }
}