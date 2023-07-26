import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Factory } from 'nestjs-seeder';
import { CounselingEntity } from '../../counseling/data/counseling.entity';

@Entity({
  name: 'Doctor',
})
export class DoctorEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Factory((faker) => faker.person.fullName())
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Factory((faker) => faker.company.name())
  @Column({ type: 'varchar', length: 100 })
  hospital: string;

  // 의사 : 진료정보 1대 다 관계 reservationId
  @OneToMany(
    () => CounselingEntity,
    (CounselingEntity) => CounselingEntity.Doctor,
  )
  CounselingEntity: CounselingEntity[];
}
