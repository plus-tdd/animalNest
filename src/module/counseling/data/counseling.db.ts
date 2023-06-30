import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Counseling, CounselingInfo } from '../domain/counseling.model';
import { CounselingRepository } from '../domain/counseling.repository';
import { CounselingEntity } from './counseling.entity';
import { DoctorEntity } from 'src/module/value-data/doctor.db';
import { PetEntity } from 'src/module/value-data/pet.db';
import { Pet } from 'src/module/pet/pet.entity';
import { InvalidCounselingInfoError } from '../counseling.error';
import { CounselingMapper } from '../counseling.mapper';
import { Schedule, ScheduleEntity } from './../../value-data/schedule.db';

//Injectable이 이걸 다른곳에 주입할수있단거 같음.
@Injectable()
export class CounselingRepositoryImpl implements CounselingRepository {
  constructor(
    // DB 주입
    // User DB
    @InjectRepository(Pet)
    private PetDB: Repository<Pet>,
    @InjectRepository(DoctorEntity)
    private DoctorDB: Repository<DoctorEntity>,
    @InjectRepository(CounselingEntity)
    private CounselingDB: Repository<CounselingEntity>,
  ) {
    this.mapper = new CounselingMapper();
  }

  private mapper: CounselingMapper;

  //스케쥴을 반환
  async getSchedules(): Promise<Schedule[]> {
    return;
  }

  async registerCounselingHistory(info: CounselingInfo): Promise<Counseling> {
    // User 정보도 가져와야 함 ( 왜 ? Counseling 도메인은 그 상담내역의 대상자 주인 이름이 들어가기 때문 id가 아니라 )

    // pet 이 있는지 + 그 user 가 주인이 맞는지 ?
    const pet = await this.PetDB.findOne({
      where: { id: info.petId },
    });
    if (pet === null) throw new InvalidCounselingInfoError('애완동물');
    // doctor 가 있는지 ?
    const doctor = await this.DoctorDB.findOne({
      where: { id: info.doctorId },
    });
    if (doctor === null) throw new InvalidCounselingInfoError('의사');
    // CounselingEntity 만들어서 저장
    const entity = this.CounselingDB.create({
      doctorId: doctor.id,
      userId: info.userId,
      petId: pet.id,
      counselingDateTime: info.dateTime,
      content: info.content,
      expense: info.expense,
    });
    /*
        insert : 생성 ( id 같은거 있으면 터짐 )
        update : 수정 ( id 찾아보고 없으면 터짐 )
        save : 조회해보고 생성 or 수정 ( 터지진 않음 )
    */
    await this.CounselingDB.insert(entity);
    return {
      id: entity.id,
      hospitalName: doctor.hospital,
      doctorName: doctor.name,
      userName: 'name',
      petName: pet.name,
      dateTime: entity.counselingDateTime,
      expense: entity.expense,
      content: entity.content,
    };
  }

  async getConselingHistories(
    startDate: Date,
    endDate: Date,
  ): Promise<Counseling[]> {
    throw new Error('Method not implemented.');
  }

  async getOneCounseling(counselingId: string): Promise<Counseling> {
    return;
  }

  async deleteOneCounseling(counselingId: string): Promise<boolean> {
    return;
  }
}
