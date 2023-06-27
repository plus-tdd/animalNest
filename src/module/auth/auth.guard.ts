// import { Injectable ,CanActivate,ExecutionContext } from '@nestjs/common';
// import { JwtStrategy } from './passport/auth.passport';
//
// @Injectable()
// export class AuthGuard implements CanActivate {
//     constructor(private readonly passport: JwtStrategy) {}
//     async canActivate(
//       context: ExecutionContext,
//     ): Promise<boolean> {
//         // guard는 http 요청을 가져오고
//         const request = context.switchToHttp().getRequest();
//         // 요청을 passport 를 통해 검증한다.
//         const userId = await this.passport.validate(request, null); // payload는 여기서 안먹는데... 어뜨카지?
//
//         if (!userId) {
//       return false;
//         }
//
//         // user find 걸어서 유저 추가정보 받아온다거나
//
//         return userId;
//     }
//
//     async testCanActivate(request): Promise<any> {
//         const userId = await this.passport.validate(request, null); // payload는 여기서 안먹는데... 어뜨카지?
//         if (!userId) {
//             return false;
//         }
//         return userId;
//     }
// }


import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from "@nestjs/passport";

@Injectable
export class AuthGuard extends AuthGuard('jwt') {
    async canActivate(context: ExecutionContext) {
        const result = (await super.canActivate(context)) as boolean;
        const request = context.switchToHttp().getRequest();

        if (!request.headers.authorization) {
            return true;
        }
        return result;
    }

    handleRequest(err, user, info) {
        if (err || !user) {
            return false; // 인증 실패시 false 리턴
        }
        return user
    }
}
