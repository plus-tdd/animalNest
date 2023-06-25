import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from '../../module/auth/auth.guard';
import { JwtStrategy } from '../../module/auth/passport/auth.passport';

// /* 준비된 성공 요청값 시작 */
// // 성공적인 최초 토큰 요청값
// const requestAccessToken : RequestAccessToken = {
//   accessToken: validAccessToken
// };
//
// // 성공적인 유저 페이로드 요청값
// const requestAuthInfo : RequestAuthInfo = {
//   userId : 1,
//   accessToken: validAccessToken
// };
//
// // 성공적인 인증 반환값
// const responseServiceValue : ResponseServiceValue = {
//   returnStatus : 200,
//   returnMessage : '성공'
// };
// /* 준비된 성공 요청값 끝 */

/* 준비된 jwt token 시작 */
// userId : 1  secretKey : animal 모든것이 정상
const validAccessToken : string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjF9.roMbwZKHJyadHzYNPUWz1Dp-RP-mwPT5QUGReWMsK80';

// userId : "1"  secretKey : animal  userId가 number 이 아님 잘못됨
const invalidPayloadAccessToken : string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxIn0.9h0uUOtEhbcdYF7rPJi2p0lqfdbwCTq69a7HahTBmqw';

// userId : 1  secretKey : cat  secretKey 가 잘못됨
const invalidSecretKeyAccessToken : string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjF9.wssKwu7XH9vtf93svAp6tAjeVldh_NHkyDQF-aI9dwI';

// 존재 자체가 잘못됨
const noneAccessToken : string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ.eyJ1c2VySWQiOjF.wssKwu7XH9vtf93svAp6tAjeVldh_NHkyDQF-aI9dw'
/* 준비된 jwt token 끝 */

describe('요청시 받은 accessToken을 복호화', () => {
  let authGuard : AuthGuard;
  let passport : JwtStrategy;

  // 각 테스트가 실행되기 전에 반복 실행될 코드
  beforeAll(() => {
    passport = new JwtStrategy();
    authGuard = new AuthGuard(passport);
  })

  test('accessToken 이 정상적이라면 true를 반환한다. ', async () => {
    const requestValidAccessToken = {
      headers: {
        Authorization: validAccessToken,
      },
    };
    const validAccessTokenResult = await authGuard.testCanActivate(requestValidAccessToken);
    expect(validAccessTokenResult).toEqual(true)
  })

  test('accessToken 이 공란이라면 false를 반환한다. ', async () => {

    const requestEmptyAccessToken = {
      headers: {
        Authorization: '',
      },
    };

    const decodeAccessTokenResult = await authGuard.testCanActivate(requestEmptyAccessToken);
    expect(decodeAccessTokenResult).toEqual(false)
  })

  test('accessToken 을 복호화 실패하면 false를 반환한다.', async () => {
    // 토큰 자체가 잘못되었을 때
    const requestEmptyAccessToken = {
      headers: {
        Authorization: noneAccessToken,
      },
    };

    const decodeAccessTokenResult = await authGuard.testCanActivate(requestEmptyAccessToken);
    expect(decodeAccessTokenResult).toEqual(false)


    // 토큰에 사용된 secretKey 가 잘못되었을 때
    const requestInvalidSecretKeyAccessToken = {
      headers: {
        accessToken: noneAccessToken
      },
    }

    const decodeInvalidSecretKeyAccessTokenResult = await authGuard.testCanActivate(requestInvalidSecretKeyAccessToken);
    expect(decodeInvalidSecretKeyAccessTokenResult).toEqual(false)

  })

  test('accessToken 을 복호화 한 값이 유효한 값이 number 가 아니라면 false를 반환한다.', async () => {
    // 페이로드가 -1일 때
    const requestInvalidPayloadAccessToken = {
      headers: {
        accessToken: invalidPayloadAccessToken
      },
    }

    const decodeInvalidPayloadAccessTokenResult = await authGuard.testCanActivate(requestInvalidPayloadAccessToken);
    expect(decodeInvalidPayloadAccessTokenResult).toEqual(false)
  })
})

// describe( '모든 요청시 받는 유저정보 인증' , () => {
//   let authGuard : AuthGuard;
//
//   // 각 테스트가 실행되기 전에 반복 실행될 코드
//   beforeAll(() => {
//     authGuard = new AuthGuard();
//   })
//
//   test('userId 의 값이 자연수가 아니라면 올바르지 않은 값이라는 에러를 반환한다.', async () => {
//     const requestMinusAuthInfo : RequestAuthInfo = {
//       userId: -1,
//       accessToken: 'token'
//     }
//     const requestDoubleAuthInfo : RequestAuthInfo = {
//       userId: 0.15,
//       accessToken: 'token'
//     }
//     const requestMinusDoubleAuthInfo : RequestAuthInfo = {
//       userId: -1.0000015,
//       accessToken: 'token'
//     }
//
//     const responseServiceFailValue : ResponseServiceValue = {
//       returnStatus : 400,
//       returnMessage : 'Invalid value userId'
//     }
//
//     const minusUserIdResult = authGuard.testCanActivate(requestMinusAuthInfo);
//     const doublesUserIdResult = authGuard.testCanActivate(requestDoubleAuthInfo);
//     const minusDoublesUserIdResult = authGuard.testCanActivate(requestMinusDoubleAuthInfo);
//     expect(minusUserIdResult).toEqual(responseServiceFailValue)
//     expect(doublesUserIdResult).toEqual(responseServiceFailValue)
//     expect(minusDoublesUserIdResult).toEqual(responseServiceFailValue)
//   })
//
// })