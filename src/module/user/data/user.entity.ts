import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PetEntity } from '../../pet/data/pet.entity';
import { CounselingEntity } from '../../counseling/data/counseling.entity';
import { PaymentEntity } from '../../payment/data/payment.entity';
//import now = jest.now;
import { Factory } from 'nestjs-seeder';

@Entity({
  name: 'user',
  schema: 'animalNest',
})
export class UserEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Factory((faker) => faker.person.fullName())
  @Column('varchar', { length: 45 })
  userName: string;

  @Factory((faker) => faker.internet.userName())
  @Column('varchar', { length: 45 })
  account: string;

  @Factory((faker) => faker.internet.password())
  @Column('varchar', { length: 100 })
  password: string;

  @Factory((faker) => faker.phone.number())
  @Column('varchar', { length: 45 })
  phoneNumber: string;

  @Factory((faker) => faker.date.anytime())
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Factory((faker) => faker.date.anytime())
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  // userId 로 통일
  // 유저 : 반려동물 정보  1대 다 관계 petId
  @OneToMany(() => PetEntity, (PetEntity) => PetEntity.UserEntity)
  PetEntity: PetEntity[];
  // 유저 : 진료정보 1대 다 관계 reservationId
  @OneToMany(
    () => CounselingEntity,
    (CounselingEntity) => CounselingEntity.User,
  )
  CounselingEntity: CounselingEntity[];
  // 유저 : 페이먼트 1대 다 관계 paymentId
  @OneToMany(() => PaymentEntity, (PaymentEntity) => PaymentEntity.User)
  PaymentEntity: PaymentEntity[];
}
