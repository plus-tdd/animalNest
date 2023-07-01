import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../user/data/user.entity';

@Entity({
  name: 'pet',
  schema: 'animalNest',
})
export class Pet {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column('int')
  userId: number;
  @ManyToOne(() => User, (User) => User.Pet)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  User: User;

  @Column('varchar', { name: 'pet_type', length: 45 })
  petType: string;

  @Column('varchar', { name: 'breed', length: 45 })
  breed: string;

  @Column('varchar', { name: 'name', length: 45 })
  name: string;

  @Column('varchar', { name: 'b_day', length: 45 })
  bDay: string;

  @Column('varchar', { name: 'adoption_day', length: 45 })
  adoptionDay: string;

  @Column('int', { name: 'weight' })
  weight: number;

  @Column('varchar', { name: 'gender', length: 45 })
  gender: string;

  @Column('varchar', { name: 'neuter', length: 45 })
  neuter: string;

  @Column('varchar', { name: 'allergy', length: 45 })
  allergy: string;

  @Column('varchar', { name: 'disease', length: 45 })
  disease: string;

  @Column('datetime', { name: 'created_at' })
  createdAt: Date;

  @Column('datetime', { name: 'updated_at' })
  updatedAt: Date;
}
