import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn, CreateDateColumn, UpdateDateColumn
} from "typeorm";
import { UserEntity } from '../../user/data/user.entity';
import { timestamp } from "rxjs";
import { Factory } from "nestjs-seeder";

@Entity({
  name: 'pet',
  schema: 'animalNest',
})
export class PetEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Factory((faker) => faker.number.int({min: 1, max: 50}))
  @Column('int')
  userId: number;
  @ManyToOne(() => UserEntity, (UserEntity) => UserEntity.PetEntity)
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  UserEntity: UserEntity;

  @Factory((faker) => faker.helpers.arrayElement(['cat', 'dog']))
  @Column('varchar', { name: 'pet_type', length: 45 })
  petType: string;

  @Factory((faker) => faker.helpers.arrayElement(['cat', 'dog']) === 'cat' ? faker.animal.cat() : faker.animal.dog())
  @Column('varchar', { name: 'breed', length: 45 })
  breed: string;

  @Factory((faker) => faker.person.firstName())
  @Column('varchar', { name: 'name', length: 45 })
  name: string;

  @Factory((faker) => faker.date.birthdate({min: 1, max: 15, mode: 'age'}))
  @Column('varchar', { name: 'b_day', length: 45 })
  bDay: string;

  @Factory((faker) => faker.date.soon({ days: 300 }))
  @Column('varchar', { name: 'adoption_day', length: 45 })
  adoptionDay: string;

  @Factory((faker) => faker.number.int({min: 10, max: 20}))
  @Column('int', { name: 'weight' })
  weight: number;

  @Factory((faker) => faker.person.sexType())
  @Column('varchar', { name: 'gender', length: 45 })
  gender: string;

  @Factory((faker) => faker.date.birthdate({min: 1, max: 15, mode: 'age'}))
  @CreateDateColumn({ type: 'timestamp', name: 'neuter',  nullable: true })
  neuter: Date;

  @Factory((faker) => faker.lorem.words({ min: 1, max: 3 }) )
  @Column('varchar', { name: 'allergy', length: 45 })
  allergy: string;

  @Factory((faker) => faker.lorem.words({ min: 1, max: 3 }) )
  @Column('varchar', { name: 'disease', length: 45 })
  disease: string;

  @Factory((faker) => faker.date.soon({ days: 10 }))
  @CreateDateColumn({ type: 'timestamp'})
  createdAt: Date;

  @Factory((faker) => faker.date.soon({ days: 10 }))
  @UpdateDateColumn({ type: 'timestamp'})
  updatedAt: Date;
}
