export class UserOutPutDto {
    readonly id : number
    readonly account : string
    readonly userName : string
    readonly phoneNumber : string
    readonly password : string
}
export class LoginOutputDto {
    readonly accessToken : string
}