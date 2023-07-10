import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Counseling, CounselingInfo, CounselingStatus } from '../domain/counseling.model';
import { CounselingRepository } from '../domain/counseling.repository';
import { CounselingEntity } from './counseling.entity';
import { InvalidCounselingInfoError } from '../counseling.error';
import { CounselingMapper } from '../counseling.mapper';
import { DoctorEntity } from "../../doctor/doctor.entity";
import { PetEntity } from "../../value-data/pet.db";

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

    const result : CounselingEntity[] = await this.CounselingDB.find( {where : {
      counselingDateTime : Between(startDate, endDate)
    }
  })

  return result.map( v => this.mapper.mapEntityToDomain(v));

  }

  async getOneCounseling(counselingId: string): Promise<Counseling> {
    const result = await this.CounselingDB.findOne( { where : { id : +counselingId}})
    
    return this.mapper.mapEntityToDomain(result);
  }

  async updateCounselingStatusDone(
    counselingId: string,
    content: string,
    expense : number,
  ): Promise<boolean> {

    const result = await this.CounselingDB.update( { id : + counselingId}, { content : content, counselingStatus : CounselingStatus.Complete, expense : expense })
    
    if (result.affected !== 1){
      throw new Error('updateCounselingStatusDone failed');
    } else {
      return true;
    }
    
  }

  async deleteOneCounseling(counselingId: string): Promise<boolean> {
    const result = await this.CounselingDB.delete(counselingId)

    if (result.affected !== 1){
      throw new Error('deleteOneCounseling failed');
    } else {
      return true;
    }
  }
}
