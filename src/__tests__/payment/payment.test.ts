import { CardCompany} from "../../module/payment/domain/payment.model";
import { PaymentService } from "../../module/payment/domain/payment.service";
import { PaymentInfo } from "../../module/payment/domain/payment.model";
import { PaymentRepository, TestPaymentRepository } from "../../module/payment/domain/payment.repository";
import { TestExternalPaymentSDK } from "../../module/payment/domain/payment.external.sdk";
import { AlarmService, TestAlarmService } from '../../module/alarm/alarm.service';

// Completed request Info
// const validatedRequest: PaymentCardRequestInfo = {
//     cardNum: 1234567812345678, // string으로 형변환했을때 16자리 - 정책상 16자리가 default라고 가정
//     endDate: '2412', // 2412
//     cvc: 345,
//     cardCompany: CardCompany.Kookmin // 질문사항 : enum은 컨트롤러단에서 처리할거라 테스트 안해도 되는게 맞나여??
// }


// Jest에서 제공하는 테슽 스윝 함수, 테스트를 그룹화 할때 사용  --> describe로 전체 그룹화는 소그룹 다 만들고 나서 마지막에 하면되나요?
describe('결제 시 필요한 카드 정보 검증 TestSuite', () => {
    
    let paymentService: PaymentService
    let externalPaymentSDK: TestExternalPaymentSDK;
    let paymentRepository: PaymentRepository;
    let alarmService: AlarmService;

    // 각 테스트가 실행되기 전에 반복 실행될 코드
    beforeAll(() => {
        paymentRepository = new TestPaymentRepository();
        externalPaymentSDK = new TestExternalPaymentSDK();
        paymentService = new PaymentService(paymentRepository, alarmService)
    })

    afterEach(() => {
        // jest.restoreAllMocks()는 모든 모의(Mock) 함수의 원래 구현을 복원하는 역할한다
        // 일반적으로 테스트 케이스에서 모의(Mock) 함수를 사용하게 되면 해당 함수의 원래 구현이 변경되어 다른 테스트에 영향을 줄 수 있다. 
        // 이러한 상태를 방지하기 위해 jest.restoreAllMocks()를 사용하여 테스트가 끝난 후에는 모의(Mock) 함수의 원래 구현으로 복원한다
        jest.restoreAllMocks(); // -> 질문 사항 : rollback의 역할인가요??
      });

      // dto 변환 - 통합테스트나 애플리케이션 만드는건 할 수 있으니까 cicd
      // 파트별로 ci 코드 테스트 과정, 코드 depoly과정, aws 세팅하는 과정
      // aws 공부 이참에 해보는 사람 githubaction
      // 배포할때는 aws한사람이랑 deploy 스크립트 작성한 사람이랑 협업을 잘해야한다

    test('카드 번호가 16자리 넘거나, 음수일때 실패한다.', async () => {
 
        //  실패케이스 - 기능별로 생각하다보니 까 범위가 작아진다
        // 회원가입 서비스를 기준으로 하면 이메일 검증 하는 함수, 유저를 조회한ㄴ 함수,
        // 유저 검증하는 함수 하나, 사용자의 인풋을 테이블에 넣어주는 함수
        // 서비스에서 테스트할건 뭐냐면 레포지토리 갔는데 에러를 뱉어낼 수 있는데,
        // 회우너가입에서는 유저를 못찾았을때 등록이 되는건데
        // 유저를 조회하는건 레포지토리 역할이고, 서비스에서 유저가 없는 걸 테스트하는 이유는
        // 유저가 중복되었을때 어떤 에러를 내려주는건지 (클라이언트에서 내려준다) - 
        // 컨트롤러 테스트는 큰 기능 단위에 역할을 테스트하는거다 - 회원가입이 성공했다 안했다
        // 서비스의 역할은 각각의 최소 함수들의 에러를 핸들링하는 거다
        // 고거보다 더 작은 단위, 벨리데이터, 레포지토리가 동작의 단위 테스트
        // 서비스라는거는 각각 함수를 나열해서 만드는거다
        // 회원가입이라는걸 만들겠다. auth서비스의 레지스터유저같은 메소드를 만들겠다하고 할때
        // 이걸 만드는건 각각의 함수들이 모여진거다, 얘네들이 에러들을던졌을때
        // e2c는 실제 서버를 띄워서하는거라서 ~~
        // 그래서 실패케이스 얘기하는 이유가 그래서 나온거다. 에러가 발생했으면 서비스에서 테스트 하는거다
        // 
        const cardNumOverSixteen: PaymentInfo = {
            userId : 1,
            cardNum: 123456789123456789, // string으로 형변환했을때 길이 18자리
            endDate: '2412', // yymm
            cvc: 345,
            cardCompany: CardCompany.Kookmin,
            price: 10000
        }

        const isNegativeCardNum: PaymentInfo = {
            userId : 1,
            cardNum: -1,  // 음수일때
            endDate: '2412', // yymm
            cvc: 345,
            cardCompany: CardCompany.Kookmin,
            price: 10000
        }
        // await을 사용하여 비동기 작업 완료까지 기다림
        const overCardNum = await paymentService.validatePaymentInfo(cardNumOverSixteen)
        expect(overCardNum).toEqual(false);
        const negativeCardNum = await paymentService.validatePaymentInfo(isNegativeCardNum)
        expect(negativeCardNum).toEqual(false);
    })

    test('모든 필드가 필수 값인데, 하나라도 없을 경우 실패한다.', async () => {
    
        //각 필드가 null 일 경우를 테스트 하고싶은데, number랑 enum은 null일 경우를 테스트를 어떻게 만드나요..?
        const cardNumIsEmpty: PaymentInfo = {
            userId : 1,
            cardNum: undefined, //cardNum -> undefined 일 경우 -  알아봐야할것 undefined랑 null의 차이??
            endDate: '2412', // yymm
            cvc: 345,
            cardCompany: CardCompany.Kookmin,
            price: 10000
        }

        const endDateIsEmpty: PaymentInfo = {
            userId : 1,
            cardNum: 1234567812345678,
            endDate: '', // string이 undefined 일 경우
            cvc: 345,
            cardCompany: CardCompany.Kookmin,
            price: 10000
        }

        const cvcIsEmpty: PaymentInfo = {
            userId : 1,
            cardNum: 1234567812345678,
            endDate: '2412', 
            cvc: undefined, // cvc가 undefined 일 경우
            cardCompany: CardCompany.Kookmin,
            price: 10000
        }

        // enum은 컨트롤러 단에서 검증
        // const companyIsEmpty : PaymentCardRequestInfo = {
        //     cardNum: 1234567812345678,
        //     endDate: '2412', 
        //     cvc: 345, 
        //     cardCompany:  // enum Null일 경우도 테스트할 객체 변수 만들어야하나?
        // }

        const emptyCardNum = await paymentService.validatePaymentInfo(cardNumIsEmpty)
        expect(emptyCardNum).toEqual(false);
        const emptyEndDate = await paymentService.validatePaymentInfo(endDateIsEmpty)
        expect(emptyEndDate).toEqual(false);
        const emptyCvc = await paymentService.validatePaymentInfo(cvcIsEmpty)
        expect(emptyCvc).toEqual(false);
        // const emptyCompany = await paymentService.validatePaymentInfo(companyIsEmpty)
        // expect(emptyCompany).toEqual(false);
    })


describe('결제 시 외부 SDK에 정상적으로 전달되는지 확인 TestSuite', () => {
        
    let paymentService: PaymentService
    let externalPaymentSDK: TestExternalPaymentSDK;
    let paymentRepository: PaymentRepository;
    let alarmService: AlarmService;

    // 각 테스트가 실행되기 전에 반복 실행될 코드
    beforeAll(() => {
        paymentRepository = new TestPaymentRepository();
        externalPaymentSDK = new TestExternalPaymentSDK();
        paymentService = new PaymentService(paymentRepository, alarmService)
    })

    test('외부 SDK에 결제 요청이 성공할 경우 성공 결과를 반환한다', async () => {
    
        // 외부 SDK의 makePayment 메서드를 모의(Mock) 함수로 대체
        const paymentSdkMock = jest.spyOn(externalPaymentSDK, 'makePayment').mockResolvedValue('결제 요청 성공');
        // mockMakePayment.mockImplementation(async () => true);
     
        const requestInfo: PaymentInfo = {
        userId : 1,
        cardNum: 1234567812345678,
        endDate: '2412',
        cvc: 345,
        cardCompany: CardCompany.Kookmin,
        price : 10000
        };
        
        // 결제 요청을 수행하고 예상된 성공 결과를 검증합니다.
        const sdkResult = await externalPaymentSDK.makePayment(requestInfo);
        expect(sdkResult).toEqual('결제 요청 성공');

        // makePayment 함수가 특정 인수와 함께 호출되었는지 검사한다.
        expect(paymentSdkMock).toHaveBeenCalledWith(requestInfo);
    });

    test('외부 SDK에 결제 요청이 실패할 경우 실패 결과를 반환한다', async () => {
      // 외부 SDK의 makePayment 메서드를 모의(Mock) 함수로 대체한다
        const paymentSdkMock = jest.spyOn(externalPaymentSDK, 'makePayment').mockRejectedValue(new Error('결제 요청 실패'));

        const requestInfo: PaymentInfo = {
            userId : 1,
            cardNum: 1234567812345678,
            endDate: '2412',
            cvc: 345,
            cardCompany: CardCompany.Kookmin,
            price : 10000
            };
            // 도메인 분석, 아키텍처 고민했는지, 코드 리뷰 ㄴㄴ

       // const sdkResult = await externalPaymentSDK.makePayment(requestInfo);
        await expect(externalPaymentSDK.makePayment(requestInfo)).rejects.toThrowError('결제 요청 실패');

        //makePayment 함수가 특정 인수와 함께 호출되었는지 검사한다.
        await expect(paymentSdkMock).toHaveBeenCalledWith(requestInfo); //--> 왜 안되는걸까여..!?!!!!?!?!!!!!!!!!!
    });
})

describe('결제 정보 저장 TestSuite', () => {

    let paymentService: PaymentService
    let externalPaymentSDK: TestExternalPaymentSDK;
    let paymentRepository: PaymentRepository;
    let alarmService: AlarmService

    // 각 테스트가 실행되기 전에 반복 실행될 코드
    beforeAll(() => {
        paymentRepository = new TestPaymentRepository();
        externalPaymentSDK = new TestExternalPaymentSDK();
        paymentService = new PaymentService(paymentRepository, alarmService)
    })

    test('결제 정보를 저장한다', async () => {  // 실패한다 케이스도 필요할까요?

    // 결제 정보 저장
    const paymentInfo: PaymentInfo = {
        userId: 1,
        cardNum: 1234567812345678,
        endDate: '2412', // yymm
        cvc: 345,
        cardCompany: CardCompany.Kookmin,
        price: 10000 // 만원이라고 가정
    }
        const savePaymentInfo = await paymentService.savePaymentInfo(paymentInfo);
        expect(savePaymentInfo).toBe(true);
    });
})
});
