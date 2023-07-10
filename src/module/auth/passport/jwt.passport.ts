// import { Injectable } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { ExtractJwt, Strategy } from 'passport-jwt';
//
// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
//   constructor() {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // header의 Bearer 이름 가진 토큰을 알아서 추출해옴
//       secretOrKey: process.env.JWT_SECRET_KEY,
//       passReqToCallback: true,
//     });
//   }
//
//   // request와 payload의 출처가 어디..?
//   async validate(request: Request, payload: any) {
//     return payload;
//   }
//   // 이방법도있다고..
//   // async validate(payload: any) {
//   //     return { userId: payload.sub, username: payload.username };
//   // }
// }
