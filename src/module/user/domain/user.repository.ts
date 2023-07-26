import { SignUpDto } from '../api/user.dto';
import { UserOutPutDto } from './user.output.dto';

export const USER_REPOSITORY = 'User Repository';

export interface UserRepository {
  findOneByUserId(userId: number);
  findUserByAccount(account: string);
  signUp(signUpDto: SignUpDto);
  createMany(users);
  deleteAll();
}

export class TestUserRepositoryImpl implements UserRepository {
  private readonly users : UserOutPutDto =
    {
      id: 1,
      userName: 'john',
      account: 'changeme',
      phoneNumber: '01022223333',
      password: 'password',
    };

  async findOneByUserId(userId: number): Promise<UserOutPutDto> {
    if (this.users.id === userId) {
      return this.users
    }
  }

  async findUserByAccount(account): Promise<UserOutPutDto> {
    if (this.users.account === account) {
      return this.users
    }
  }

  async signUp(signUpDto: SignUpDto) : Promise<UserOutPutDto> {
    return this.users;
  }

  async createMany(doctor) {
    return this.users;
  }
  async deleteAll() {
    return true;
  }
}
