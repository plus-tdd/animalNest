import moment from 'moment';

// export type BaseResponse = {
//   statusCode: number;
//   timestamp: String;
//   message: String;
// };

export class Response {
  success(result?: any) {
    return {
      statusCode: 200,
      timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
      message: '성공',
      result: result,
    };
  }
}
