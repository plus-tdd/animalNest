import { CardCompany, PaymentCardRequestInfo } from "src/payment/model";
import { PaymentService } from "src/payment/PaymentService";
import { PaymentDatabase } from "src/payment/PaymentDatabase";
import { ExternalPaymentSDK } from "src/payment/externalPaymenySDK";
import { PaymentInfo } from "src/payment/PaymentDatabase";


// Completed request Info
const validatedRequest: PaymentCardRequestInfo = {
    cardNum: 1234567812345678, // string으로 형변환했을때 16자리 - 정책상 16자리가 default라고 가정
    endDate: '2412', // 2412
    cvc: 345,
    cardCompany: CardCompany.Kookmin // 질문사항 : enum은 컨트롤러단에서 처리할거라 테스트 안해도 되는게 맞나여??
}


// Jest에서 제공하는 테슽 스윝 함수, 테스트를 그룹화 할때 사용  --> describe로 전체 그룹화는 소그룹 다 만들고 나서 마지막에 하면되나요?
describe('결제 시 필요한 카드 정보 검증 TestSuite', () => {
    
    let paymentService: PaymentService
    let paymentDatabase: PaymentDatabase;

    // 각 테스트가 실행되기 전에 반복 실행될 코드
    beforeAll(() => {
        paymentDatabase = new PaymentDatabase();
        paymentService = new PaymentService(paymentDatabase)
    })

    afterEach(() => {
        // jest.restoreAllMocks()는 모든 모의(Mock) 함수의 원래 구현을 복원하는 역할한다
        // 일반적으로 테스트 케이스에서 모의(Mock) 함수를 사용하게 되면 해당 함수의 원래 구현이 변경되어 다른 테스트에 영향을 줄 수 있다. 
        // 이러한 상태를 방지하기 위해 jest.restoreAllMocks()를 사용하여 테스트가 끝난 후에는 모의(Mock) 함수의 원래 구현으로 복원한다
        jest.restoreAllMocks(); // -> 질문 사항 : rollback의 역할인가요??
      });

    test('카드 번호가 16자리 넘거나, 음수일때 실패한다.', async () => {

        const cardNumOverSixteen: PaymentCardRequestInfo = {
            cardNum: 123456789123456789, // string으로 형변환했을때 길이 18자리
            endDate: '2412', // yymm
            cvc: 345,
            cardCompany: CardCompany.Kookmin // 질문사항 : enum은 컨트롤러단에서 처리할거라 테스트 안해도 되는게 맞나여??
        }

        const isNegativeCardNum: PaymentCardRequestInfo = {
            cardNum: -1,  // 음수일때
            endDate: '2412', // yymm
            cvc: 345,
            cardCompany: CardCompany.Kookmin
        }
        // await을 사용하여 비동기 작업 완료까지 기다림
        const overCardNum = await paymentService.validatePaymentInfo(cardNumOverSixteen)
        expect(overCardNum).toEqual(false);
        const negativeCardNum = await paymentService.validatePaymentInfo(isNegativeCardNum)
        expect(negativeCardNum).toEqual(false);
    })

    test('모든 필드가 필수 값인데, 하나라도 없을 경우 실패한다.', async () => {
    
        //각 필드가 null 일 경우를 테스트 하고싶은데, number랑 enum은 null일 경우를 테스트를 어떻게 만드나요..?
        const cardNumIsEmpty: PaymentCardRequestInfo = {
            cardNum: undefined, //cardNum -> undefined 일 경우 -  알아봐야할것 undefined랑 null의 차이??
            endDate: '2412', // yymm
            cvc: 345,
            cardCompany: CardCompany.Kookmin
        }

        const endDateIsEmpty: PaymentCardRequestInfo = {
            cardNum: 1234567812345678,
            endDate: '', // string이 null 일 경우
            cvc: 345,
            cardCompany: CardCompany.Kookmin
        }

        const cvcIsEmpty: PaymentCardRequestInfo = {
            cardNum: 1234567812345678,
            endDate: '2412', 
            cvc: undefined, // cvc가 undefined 일 경우
            cardCompany: CardCompany.Kookmin
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

    test('결제 요청이 외부 SDK에 정상적으로 전달되는지 확인한다.', async () => {  // 실패한다 케이스도 필요한뎁,,
        // 외부 SDK의 makePayment 메서드를 모의(Mock) 함수로 대체
        // jest.spyOn()은 기존 구현을 유지하면서 특정 동작을 추가하거나 수정할 때 유용하다.
        // 메소드가 실행되는 것을 살펴보는 것 뿐만 아니라 기존의 구현이 보존되길 바랄 때 사용한다. 구현을 mocking하고 차후에 원본을 복원할 수 있다.
        const mockMakePayment = jest.spyOn(ExternalPaymentSDK, 'makePayment');
        mockMakePayment.mockImplementation(async () => true);
    
        const requestInfo: PaymentCardRequestInfo = {
          cardNum: 1234567812345678,
          endDate: '2412',
          cvc: 345,
          cardCompany: CardCompany.Kookmin
        };
        // makePayment 함수가 특정 인수와 함께 호출되었는지 검사한다.
        expect(mockMakePayment).toHaveBeenCalledWith(requestInfo);
        const sdkResult = await paymentService.paymentToSdk(requestInfo);
        expect(sdkResult).toEqual(true);
      });


      test('결제 정보를 저장한다', async () => {  // 실패한다 케이스도 필요한뎁,,
        // 결제 정보 저장
        const paymentInfo: PaymentInfo = {
            id: 1,
            cardNum: 1234567812345678,
            endDate: '2412', // yymm
            cvc: 345,
            cardCompany: CardCompany.Kookmin,
            amount: 10000 // 만원이라고 가정
        }
         const savePaymentInfo = await paymentService.makePayment(paymentInfo);
         expect(savePaymentInfo).toEqual(true);
      });
});