import {
  Column,
  Entity,
  JoinColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { UserEntity } from '../../user/data/user.entity';
import { CounselingStatus } from '../domain/counseling.model';
import { PetEntity } from '../../pet/data/pet.entity';
import { DoctorEntity } from '../../doctor/data/doctor.entity';

@Entity({
  name: 'Counseling',
  schema: 'animalnest',
})
export class CounselingEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'user_id' })
  userId: number;

  @Column('int', { name: 'pet_id' })
  petId: number;

  @Column('int', { name: 'doctor_id' })
  doctorId: number;

  @Column('datetime', { name: 'counseling_date_time' })
  counselingDateTime: Date;

  @Column({ type: 'enum', name: 'counseling_status', enum: CounselingStatus })
  counselingStatus: CounselingStatus;

  @Column('text', { name: 'content', nullable: true })
  content: string | null;

  @Column('int', { name: 'expense' })
  expense: number;

  @ManyToOne(() => UserEntity, (User) => User.CounselingEntity)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  User: UserEntity;

  @ManyToOne(() => PetEntity, (Pet) => Pet.CounselingEntity)
  @JoinColumn([{ name: 'pet_id', referencedColumnName: 'id' }])
  Pet: PetEntity;

  @ManyToOne(() => DoctorEntity, (Doctor) => Doctor.CounselingEntity)
  @JoinColumn([{ name: 'doctor_id', referencedColumnName: 'id' }])
  Doctor: DoctorEntity;
}
