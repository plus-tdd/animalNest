
export class InvalidUserInfoError extends Error {
    constructor(field: string) {
        super("잘못된 "+ field + "입니다.")
        this.name = "InvalidUserInfo"
    }
}

export class DuplicateAccountError extends Error {
    constructor(account: string) {
        super(account + "는 이미 존재하는 아이디 입니다.")
        this.name = "DuplicateAccount"
    }
}