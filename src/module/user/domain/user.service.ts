import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { DuplicateAccountError, InvalidUserInfoError } from '../user.error';
import { SignUpDto } from '../api/user.dto';
import { LoginOutputDto, UserOutPutDto } from './user.output.dto';
import { USER_REPOSITORY, UserRepository } from './user.repository';
// 예제에서는 하드 코딩 되었지만
// 이 부분은 반드시 user entity를 표현하는 class/interface여야 한다.

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository, // private readonly jwtService: JwtService,
  ) {}

  async findOneByUserId(userId: number): Promise<UserOutPutDto> {
    // userId 에 대한 검증은 끝났다고 가정함
    return this.userRepository.findOneByUserId(userId);
  }

  async findOneByUserAccount(account: string): Promise<UserOutPutDto> {
    // userId 에 대한 검증은 끝났다고 가정함
    return this.userRepository.findUserByAccount(account);
  }

  async signUp(signUpDto: SignUpDto): Promise<boolean> {
    // null, undefined, 다른 타입 등은 이미 프론트와 컨트롤러에서 걸러졌다고 가정한다.
    // "" 이나 음수 등을 검증한다
    // 이미 있는 아이디인지 검증한다.
    this.validateSignUpDto(signUpDto);
    const { account, userName, password, phoneNumber } = signUpDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    // 성공여부를 받는다. boolean
    return await this.userRepository.signUp({
      account,
      userName,
      password: hashedPassword,
      phoneNumber,
    });
  }

  private async validateSignUpDto(signUpDto: SignUpDto) {
    const { account, userName, password, phoneNumber } = signUpDto;
    // 1. 빈값이면 안됨.
    if (account === '') throw new InvalidUserInfoError('아이디');
    if (userName === '') throw new InvalidUserInfoError('이름');
    if (password === '') throw new InvalidUserInfoError('비밀번호');
    if (phoneNumber === '') throw new InvalidUserInfoError('휴대폰 번호');

    // 2. 이미 있는 아이디면 안됨
    const check_duplicate_account = await this.userRepository.findUserByAccount(
      account,
    );
    if (check_duplicate_account) throw new DuplicateAccountError(account);
  }

  //authservice쪽에 이함수없어서 에러나서 임의로 구현.
  findOne(userName: string) {
    const user = { password: 'dd' };
    return user;
  }
}
