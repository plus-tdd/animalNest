
export type Counseling = {
  id: number,
  hospitalName: string,
  doctorName: string,
  userName: string,
  petName: string,
  dateTime: Date,
  expense: number,
  content?: string,
}

export type CounselingInfo = {
  doctorId: number, // 의사 id ( 의사 = id, 소속병원, 자기 이름)
  userId: number, // 진료 대상 유저 id
  petId: number, // 그 유저의 펫 id
  dateTime: Date, // 진료날짜
  expense: number, // 비용
  content?: string, // 상담내용
}