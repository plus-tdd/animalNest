import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { UserRepository } from '../domain/user.repository';
import { SignUpDto } from '../api/user.dto';
import { UserOutPutDto } from '../domain/user.output.dto';
import { UserMapper } from '../user.mapper';

//Injectable이 이걸 다른곳에 주입할수있단거 같음.
@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    // DB 주입
    // User DB
    @InjectRepository(UserEntity)
    private UserDB: Repository<UserEntity>,
  ) {
    this.mapper = new UserMapper();
  }

  private mapper: UserMapper;

  async findOneByUserId(userId : number): Promise<UserOutPutDto> {
    const result = await this.UserDB.findOne({ where: { id: userId } });
    return this.mapper.mapToDto(result);
  }

  async findUserByAccount(
    account
  ): Promise<UserOutPutDto> {
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
