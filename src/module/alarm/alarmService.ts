
//import axios from 'axios';

export interface AlarmService {

  sendAlarm (alarmData: AlarmData): Promise<string> 
}


export class TestAlarmService  implements AlarmService {
    async sendAlarm (alarmData: AlarmData): Promise<string> {
      try {
        // 알림 요청을 보내는 비즈니스 로직을 구현합니다.
        // 예를 들어, 카카오 알림톡 API를 호출하고 응답 결과를 처리하는 등의 작업을 수행합니다.
        
        // 카카오 알림톡 API 호출 예시
       // const response = await axios.post('https://api.kakaowork.com/v1/messages.send', alarmData);
  
        // 알림 요청이 성공한 경우 성공 결과를 반환합니다.
        return '알림 성공';
      } catch (error) {
        // 알림 요청이 실패한 경우 에러를 던져서 상위 코드에서 처리하도록 합니다.
        throw new Error('알림 요청 실패');
      }
    }
  }
  
  export type AlarmData = { 
    recipient: string;
    message: string;
  }


  export class AlarmServiceImpl implements AlarmService {
    async sendAlarm (alarmData: AlarmData): Promise<string> {
      try {
        // 알림 요청을 보내는 비즈니스 로직을 구현합니다.
        // 예를 들어, 카카오 알림톡 API를 호출하고 응답 결과를 처리하는 등의 작업을 수행합니다.
        
        // 카카오 알림톡 API 호출 예시
       // const response = await axios.post('https://api.kakaowork.com/v1/messages.send', alarmData);
  
        // 알림 요청이 성공한 경우 성공 결과를 반환합니다.
        return '알림 성공';
      } catch (error) {
        // 알림 요청이 실패한 경우 에러를 던져서 상위 코드에서 처리하도록 합니다.
        throw new Error('알림 요청 실패');
      }
    }
  }

  
  
  
  
  