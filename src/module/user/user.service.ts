import { Injectable } from '@nestjs/common';

// 예제에서는 하드 코딩 되었지만
// 이 부분은 반드시 user entity를 표현하는 class/interface여야 한다.
export type User = any;

@Injectable()
export class UserService {
    private readonly users = [
        {
            userId: 1,
            username: 'john',
            password: 'changeme',
        },
        {
            userId: 2,
            username: 'maria',
            password: 'guess',
        },
    ];

    async findOne(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username);
    }
}