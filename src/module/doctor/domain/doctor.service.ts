import { Inject, Injectable } from "@nestjs/common";
import { DOCTOR_REPOSITORY, DoctorRepository } from "./docter.repository";

@Injectable()
export class DoctorService {
    constructor(
      @Inject(DOCTOR_REPOSITORY)
      private readonly doctorRepository : DoctorRepository
    ) {}
}
