import {
  Column,
  Entity,
  JoinColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../../user/user.entity';
import { CounselingStatus } from '../domain/counseling.model';

@Entity({
  name: 'Counseling',
  schema: 'animalnest',
})
export class CounselingEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'doctor_id' })
  doctorId: number;

  @Column('int', { name: 'user_id' })
  userId: number;

  @Column('int', { name: 'pet_id' })
  petId: number;

  @Column('datetime', { name: 'counseling_date_time' })
  counselingDateTime: Date;

  @Column({ type: 'enum', name: 'counseling_status', enum: CounselingStatus })
  counselingStatus: CounselingStatus;

  @Column('text', { name: 'content', nullable: true })
  content: string | null;

  @Column('int', { name: 'expense' })
  expense: number;

  @ManyToOne(() => User, (User) => User.CounselingEntity)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  User: User;
}
