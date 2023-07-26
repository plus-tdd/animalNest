
import { HttpException, HttpStatus } from '@nestjs/common';


export class InvalidPaymentInfoError extends HttpException {
    constructor(field: string) {
      super(`잘못된 ${field}입니다.`, HttpStatus.BAD_REQUEST); // 400 에러로 설정
    }
}