import { DoctorOutPutDto } from './doctor.output.dto';
import { Doctor } from './doctor.model';

export const DOCTOR_REPOSITORY = 'Doctor Repository';
export interface DoctorRepository {
  findOneDoctorById(doctorId: number): Promise<DoctorOutPutDto>;
  createMany(doctor): Promise<boolean>;
  deleteAll(): Promise<boolean>;
}
