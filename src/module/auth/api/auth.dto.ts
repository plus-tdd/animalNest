export class validateAccessTokenOutputDto {
  userId: number;
}

export type RequestAccessToken = {
  accessToken: string;
};

export type RequestAuthInfo = {
  userId: number;
  accessToken: string;
};

export type ResponseServiceValue = {
  returnStatus: number;
  returnMessage: string;
};

export class LoginDto {
  readonly account: string;
  readonly password: string;
}
