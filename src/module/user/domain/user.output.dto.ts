export class UserOutPutDto {
  readonly id: number;
  readonly account: string;
  readonly userName: string;
  readonly phoneNumber: string;
  password: string;
}
export class LoginOutputDto {
  readonly userId: number;
  readonly accessToken: string;
}
