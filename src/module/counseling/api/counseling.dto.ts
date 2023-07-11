import { CounselingStatus } from '../domain/counseling.model';
import { Transform, Type } from 'class-transformer';

export class CreateCounselingDto {
  readonly userId: number;
  readonly petId: number;
  readonly doctorId: number;
  readonly counselingDateTime: Date;
  readonly content: string;
  readonly expense: number;
}

export class UpdateCounselingDto {
  readonly counselingId: number;
  readonly content: string;
  readonly expense: number;
}

export class CounselingResponseDto {
  readonly id: number;
  readonly userName: string;
  readonly petName: string;
  readonly doctorName: string;
  readonly hospitalName: string;
  readonly dateTime: String;
  readonly status: CounselingStatus;
  readonly expense: number;
  readonly content: string;
}
