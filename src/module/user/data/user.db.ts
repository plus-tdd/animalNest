import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserRepository } from '../domain/user.repository';
import { UserIdDto, UserAccountDto, SignUpDto } from '../api/user.dto';
import { UserOutPutDto } from '../domain/user.output.dto';
import { UserMapper } from '../user.mapper';

//Injectable이 이걸 다른곳에 주입할수있단거 같음.
@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    // DB 주입
    // User DB
    @InjectRepository(User)
    private UserDB: Repository<User>,
  ) {
    this.mapper = new UserMapper();
  }

  private mapper: UserMapper;

  async findOneByUserId(userIdDto: UserIdDto): Promise<UserOutPutDto> {
    const { userId } = userIdDto;
    const result = await this.UserDB.findOne({ where: { id: userId } });
    return this.mapper.mapToDto(result);
  }

  async findUserByAccount(
    userAccountDto: UserAccountDto,
  ): Promise<UserOutPutDto> {
    const { account } = userAccountDto;
    const result = await this.UserDB.findOne({ where: { account: account } });
    return this.mapper.mapToDto(result);
  }

  async signUp(signUpDto: SignUpDto): Promise<boolean> {
    const { account, userName, password, phoneNumber } = signUpDto;
    const entity = await this.UserDB.create({
      account,
      userName,
      password,
      phoneNumber,
    });

    const result = await this.UserDB.insert(entity);

    if (result) {
      return true;
    } else {
      return false;
    }
  }
}
