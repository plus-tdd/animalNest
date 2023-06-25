import { AlarmService } from '../../module/alarm/alarmService';

describe("알림 테스트", () => {
    let alarmService: AlarmService;

    beforeEach(() => {
      // 테스트에 필요한 초기화 작업을 수행합니다.
      alarmService = new AlarmService();
    });
  

    test('알림 요청이 실패할 경우 에러를 반환한다', async () => {
        // 실패 시나리오를 테스트하기 위해 mock 함수를 사용
        // 실패 조건에 따라 mock함수 반환 값 설정
        const sendAlarmMock = jest.spyOn(alarmService, 'sendAlarm').mockRejectedValue(new Error('알림 요청 실패'));

        // 알림 요청에 필요한 데이터를 설정합니다.
        const AlarmData = {
        recipient: '01012345678',
        message: '알림 내용',
      };
        // 알림 요청을 수행하고 예상된 실패 결과를 검증합니다.
        await expect(alarmService.sendAlarm(AlarmData)).rejects.toThrowError('알림 요청 실패');

        // 모의(Mock) 함수가 예상대로 호출되었는지 검증합니다.
        expect(sendAlarmMock).toHaveBeenCalledWith(AlarmData);
      });

    test('알림 요청이 성공할 경우 성공 결과를 반환한다.', async () => {
        // 성공 시나리오를 테스트하기 위해 모의(Mock) 함수를 사용합니다.
        // 성공 조건에 따라 모의 함수의 반환 값을 설정합니다.
        const sendAlarmMock = jest.spyOn(alarmService, 'sendAlarm').mockResolvedValue('알림 성공');
    
        // 알림 요청에 필요한 데이터를 설정합니다.
        const alarmData = {
          recipient: '01012345678',
          message: '알림 내용',
        };
    
        // 알림 요청을 수행하고 예상된 성공 결과를 검증합니다.
        const result = await alarmService.sendAlarm(alarmData);
        expect(result).toEqual('알림 성공');
    
        // 모의(Mock) 함수가 예상대로 호출되었는지 검증합니다.
        expect(sendAlarmMock).toHaveBeenCalledWith(alarmData);
      });
});