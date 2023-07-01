export class CreateCounselingDto {
  readonly userId: number;
  readonly petId: number;
  readonly doctorId: number;
  readonly counselingDateTime: Date;
  readonly content: string;
  readonly expense: number;
}
