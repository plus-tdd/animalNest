import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn, CreateDateColumn, UpdateDateColumn
} from "typeorm";
import { UserEntity } from '../../user/data/user.entity';
import { timestamp } from "rxjs";

@Entity({
  name: 'pet',
  schema: 'animalNest',
})
export class PetEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column('int')
  userId: number;
  @ManyToOne(() => UserEntity, (User) => User.Pet)
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  User: UserEntity;

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

  @CreateDateColumn({ type: 'timestamp', name: 'neuter',  nullable: true })
  neuter: Date;

  @Column('varchar', { name: 'allergy', length: 45 })
  allergy: string;

  @Column('varchar', { name: 'disease', length: 45 })
  disease: string;

  @CreateDateColumn({ type: 'timestamp'})
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp'})
  updatedAt: Date;
}
