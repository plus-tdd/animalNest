import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from '../domain/user.service';
import { SignUpDto } from './user.dto';
import Logger from "../../../logger";

@Controller('user')
export class UserController {
  private logger : Logger;
  constructor(private readonly userService: UserService) {
    this.logger = new Logger('user.controller');
  }

  @Post('signup')
  signUp(@Body() signUpDto: SignUpDto) {
    try {
      this.logger.info(`회원가입 성공, ${signUpDto.account} 님 환영합니다`)
      return this.userService.signUp(signUpDto);
    } catch(e) {
      this.logger.error( e,`회원가입 실패, ${signUpDto.account} 님 미안합니다`)
    }
  }
}
