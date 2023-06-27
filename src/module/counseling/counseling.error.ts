
export class InvalidCounselingInfoError extends Error {
    constructor(field: string) {
        super("잘못된 "+ field + "입니다.")
        this.name = "InvalidCounselingInfo"
    }
}