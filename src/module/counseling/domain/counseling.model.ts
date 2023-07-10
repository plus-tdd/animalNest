export type Counseling = {
  id: number;
  userName: string;
  petName: string;
  doctorName: string;
  hospitalName: string;
  dateTime: Date;
  status: CounselingStatus;
  expense: number;
  content?: string;
};

export type CounselingInfo = {
  userId: number; // 진료 대상 유저 id
  petId: number; // 그 유저의 펫 id
  doctorId: number; // 의사 id ( 의사 = id, 소속병원, 자기 이름)
  dateTime: Date; // 진료날짜
  status: CounselingStatus; //예약, 진료 상태
  expense: number; // 비용
  content?: string; // 상담내용
};

export enum CounselingStatus {
  Reserved = 'Reserved', // 예약됨 ( 진료 전 )
  Complete = 'Complete', // 진료됨 ( 진료 후 )
}
