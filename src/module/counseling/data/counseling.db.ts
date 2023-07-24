import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import {
  Counseling,
  CounselingCreateInfo,
  CounselingUpdateInfo,
  CounselingStatus,
} from '../domain/counseling.model';
import { CounselingRepository } from '../domain/counseling.repository';
import { CounselingEntity } from './counseling.entity';
import {
  InvalidCounselingInfoError,
  counselingDataBaseError,
} from '../counseling.error';
import { CounselingMapper } from '../counseling.mapper';
import { DoctorEntity } from '../../doctor/data/doctor.entity';
import { PetEntity } from '../../pet/data/pet.entity';

//Injectable이 이걸 다른곳에 주입할수있단거 같음.
// Repository !== TypeOrm.Repsository => 완전한 Decoupling 을 달성할 수 있음 ! = > 이게 개발적으로 제가 생각하는 최적의 구조다. by 허재
@Injectable()
export class CounselingRepositoryImpl implements CounselingRepository {
  constructor(
    // DB 주입
    // User DB
    @InjectRepository(PetEntity)
    private PetDB: Repository<PetEntity>,
    @InjectRepository(DoctorEntity)
    private DoctorDB: Repository<DoctorEntity>,
    @InjectRepository(CounselingEntity)
    private CounselingDB: Repository<CounselingEntity>,
  ) {
    this.mapper = new CounselingMapper();
  }

  private mapper: CounselingMapper;

  async registerCounselingHistory(
    info: CounselingCreateInfo,
  ): Promise<Counseling> {
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

    // // CounselingEntity 만들어서 저장
    // const entity = this.CounselingDB.create({
    //   userId: info.userId,
    //   petId: info.petId,
    //   doctorId: info.doctorId,
    //   counselingDateTime: info.dateTime,
    //   content: '',
    //   expense: 0,
    // });

    const entity = this.mapper.mapCreateDomainToEntity(info);

    /*
            insert : 생성 ( id 같은거 있으면 터짐 )
            update : 수정 ( id 찾아보고 없으면 터짐 )
            save : 조회해보고 생성 or 수정 ( 터지진 않음 )
        */
    const result = await this.CounselingDB.insert(entity);

    return await this.getOneCounseling(result.identifiers[0].id);
  }

  async getCounselingHistories(
    startDate: Date,
    endDate: Date,
  ): Promise<Counseling[]> {
    const result: CounselingEntity[] = await this.CounselingDB.find({
      relations: {
        User: true,
        Pet: true,
        Doctor: true,
      },
      select: {
        id: true,
        counselingDateTime: true,
        counselingStatus: true,
        expense: true,
        content: true,
        User: {
          userName: true,
        },
        Pet: {
          name: true,
        },
        Doctor: {
          name: true,
          hospital: true,
        },
      },
      where: {
        counselingDateTime: Between(new Date(startDate), new Date(endDate)),
      },
    });

    return result.map((v) => this.mapper.mapEntityToDomain(v));
  }

  async getOneCounseling(counselingId: string): Promise<Counseling> {
    const result = await this.CounselingDB.findOne({
      relations: {
        User: true,
        Pet: true,
        Doctor: true,
      },
      select: {
        id: true,
        counselingDateTime: true,
        counselingStatus: true,
        expense: true,
        content: true,
        User: {
          userName: true,
        },
        Pet: {
          name: true,
        },
        Doctor: {
          name: true,
          hospital: true,
        },
      },
      where: { id: +counselingId },
    });

    return this.mapper.mapEntityToDomain(result);
  }

  async updateCounselingStatusDone(
    updateInfo: CounselingUpdateInfo,
  ): Promise<boolean> {
    const entity = this.mapper.mapUpdateDomainToEntity(updateInfo);
    const result = await this.CounselingDB.update(
      { id: entity.id },
      {
        content: entity.content,
        counselingStatus: entity.counselingStatus,
        expense: entity.expense,
      },
    );

    if (result.affected !== 1) {
      throw new counselingDataBaseError('updateCounselingStatusDone failed');
    } else {
      return true;
    }
  }

  async deleteOneCounseling(counselingId: string): Promise<boolean> {
    const result = await this.CounselingDB.delete(counselingId);

    if (result.affected !== 1) {
      throw new counselingDataBaseError('deleteOneCounseling failed');
    } else {
      return true;
    }
  }
}
