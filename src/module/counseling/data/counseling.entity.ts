import {
  Column,
  Entity,
  JoinColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../../user/data/user.entity';

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
  
  @ManyToOne(() => User, (User) => User.CounselingEntity)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  User: User;

  @Column('int', { name: 'pet_id' })
  petId: number;

  @Column('datetime', { name: 'counseling_date_time' })
  counselingDateTime: Date;

  @Column('text', { name: 'content', nullable: true })
  content: string | null;

  @Column('int', { name: 'expense' })
  expense: number;
}
