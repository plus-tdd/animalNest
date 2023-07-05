import { SignUpDto} from "../api/user.dto";
import {UserOutPutDto} from "./user.output.dto"

export const USER_REPOSITORY = "User Repository"

export interface UserRepository {
    findOneByUserId(userId : number)
    findUserByAccount(account : string)
    signUp(signUpDto: SignUpDto)
    createMany(users)
    deleteAll()
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

    async findOneByUserId(userId : number) : Promise<UserOutPutDto> {
        return this.users.find(user => user.id === userId);
    }

    async findUserByAccount(account) : Promise<UserOutPutDto> {
        return this.users.find(user => user.account === account);
    }

    async signUp(signUpDto: SignUpDto) : Promise<boolean> {
        const { account, userName, password, phoneNumber } = signUpDto;
        return true;
    }


    async createMany(doctor) {
        return true
    }
    async deleteAll() {
        return true
    }

}