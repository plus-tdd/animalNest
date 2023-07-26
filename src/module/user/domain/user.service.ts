import { BadRequestException, HttpException, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { DuplicateAccountError, InvalidUserInfoError } from '../user.error';
import { SignUpDto } from '../api/user.dto';
import { LoginOutputDto, UserOutPutDto } from './user.output.dto';
import { USER_REPOSITORY, UserRepository } from './user.repository';
import Logger from "../../../logger";
// 예제에서는 하드 코딩 되었지만
// 이 부분은 반드시 user entity를 표현하는 class/interface여야 한다.

@Injectable()
export class UserService {
  private logger: Logger;

  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository, // private readonly jwtService: JwtService,
  ) {
    this.logger = new Logger('user.service')
  }

  async findOneByUserId(userId: number): Promise<UserOutPutDto> {
    // userId 에 대한 검증은 끝났다고 가정함
    return this.userRepository.findOneByUserId(userId);
  }

  async findOneByUserAccount(account: string): Promise<UserOutPutDto> {
    // userId 에 대한 검증은 끝났다고 가정함
    return this.userRepository.findUserByAccount(account);
  }

  async signUp(signUpDto: SignUpDto) {
    try {
      // null, undefined, 다른 타입 등은 이미 프론트와 컨트롤러에서 걸러졌다고 가정한다.
      // "" 이나 음수 등을 검증한다
      // 이미 있는 아이디인지 검증한다.
      await this.validateSignUpDto(signUpDto);
      const { account, userName, password, phoneNumber } = signUpDto;
      const hashedPassword = await bcrypt.hash(password, 10);
      // 성공여부를 받는다. boolean
      return await this.userRepository.signUp({
        account,
        userName,
        password: hashedPassword,
        phoneNumber,
      });
    } catch (e) {
      throw e
    }
  }

  private async validateSignUpDto(signUpDto: SignUpDto) {
    try {
      const { account, userName, password, phoneNumber } = signUpDto;
      // 1. 빈값이면 안됨.
      if (account === "") throw new BadRequestException("빈값인 요청값이 있습니다 : 아이디");
      if (userName === "") throw new BadRequestException("빈값인 요청값이 있습니다 : 이름");
      if (password === "") throw new BadRequestException("빈값인 요청값이 있습니다 : 비밀번호");
      if (phoneNumber === "") throw new BadRequestException("빈값인 요청값이 있습니다 : 휴대폰 번호");

      // 2. 이미 있는 아이디면 안됨
      const check_duplicate_account = await this.userRepository.findUserByAccount(
        account
      );
      if (check_duplicate_account) throw new BadRequestException(`${account} 는 이미 있는 ID 입니다.`);
    } catch (e) {
      throw e
    }
  }

  //authservice쪽에 이함수없어서 에러나서 임의로 구현.
  findOne(userName: string) {
    const user = { password: 'dd' };
    return user;
  }
}
