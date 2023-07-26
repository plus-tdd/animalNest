import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../user/data/user.entity';
import { AuthOutPutDto } from '../domain/auth.output.dto';
import { AuthRepository } from '../domain/auth.repository';
import { AuthMapper } from '../auth.mapper';

//Injectable이 이걸 다른곳에 주입할수있단거 같음.
@Injectable()
export class AuthRepositoryImpl implements AuthRepository {
  constructor(
    // DB 주입
    // User DB
    @InjectRepository(UserEntity)
    private UserDB: Repository<UserEntity>,
  ) {
    this.mapper = new AuthMapper();
  }

  private mapper: AuthMapper;

  async findOneByUserId(userId: number): Promise<AuthOutPutDto> {
    const result = await this.UserDB.findOne({ where: { id: userId } });
    return this.mapper.mapToDto(result);
  }

  async findOneByUserAccount(account: string): Promise<AuthOutPutDto> {
    const result = await this.UserDB.findOne({ where: { account: account } });
    return this.mapper.mapToDto(result);
  }
}
