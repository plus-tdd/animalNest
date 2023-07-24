export class InvalidCounselingInfoError extends Error {
  constructor(field: string) {
    super('잘못된 ' + field + '입니다.');
    this.name = 'InvalidCounselingInfo';
  }
}

export class counselingDataBaseError extends Error {
  constructor(query: string) {
    super(query + '입니다.');
    this.name = 'counselingDataBase';
  }
}
