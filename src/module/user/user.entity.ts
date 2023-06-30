import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Pet } from '../pet/pet.entity';
import { CounselingEntity } from '../counseling/data/counseling.entity';
import { Payment } from '../payment/output/entities/Payment';

@Entity({
  name: 'user',
  schema: 'animalNest',
})
export class User {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column('varchar', { length: 45 })
  userName: string;

  @Column('varchar', { length: 45 })
  account: string;

  @Column('varchar', { length: 100 })
  password: string;

  @Column('varchar', { length: 20 })
  phoneNumber: string;

  @Column('datetime')
  createdAt: Date;

  @Column('datetime')
  updatedAt: Date;

  // userId 로 통일
  // 유저 : 반려동물 정보  1대 다 관계 petId
  @OneToMany(() => Pet, (Pet) => Pet.User)
  Pet: Pet[];
  // 유저 : 진료정보 1대 다 관계 reservationId
  @OneToMany(
    () => CounselingEntity,
    (CounselingEntity) => CounselingEntity.User,
  )
  CounselingEntity: CounselingEntity[];
  // 유저 : 페이먼트 1대 다 관계 paymentId
  @OneToMany(() => Payment, (Payment) => Payment.User)
  Payment: Payment[];
}
