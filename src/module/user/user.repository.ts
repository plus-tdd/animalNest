import { UserIdDto, SignUpDto,UserAccountDto } from "./user.dto";
import {UserOutPutDto} from "./user.output.dto"

export interface UserRepository {
    findOneByUserId(userIdDto : UserIdDto)
    findUserByAccount(userAccountDto : UserAccountDto)
    signUp(signUpDto: SignUpDto)
}

export class TestUserRepositoryImpl implements UserRepository {
    private readonly users = [
        {
            id: 1,
            userName: 'john',
            account: 'changeme',
            phoneNumber: '01022223333',
            password : 'password'
        },
        {
            id: 2,
            userName: 'maria',
            account: 'guess',
            phoneNumber: '01033332222',
            password : 'password'
        },
    ];

    async findOneByUserId(userIdDto : UserIdDto) : Promise<UserOutPutDto> {
        const { userId } = userIdDto;
        return this.users.find(user => user.id === userId);
    }

    async findUserByAccount(userAccountDto : UserAccountDto) : Promise<UserOutPutDto> {
        const { account } = userAccountDto;
        return this.users.find(user => user.account === account);
    }

    async signUp(signUpDto: SignUpDto) : Promise<boolean> {
        const { account, userName, password, phoneNumber } = signUpDto;
        return true;
    }

}