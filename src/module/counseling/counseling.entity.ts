import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Counseling {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  petId: number;

  @Column()
  counselingDateTime: Date;

  @Column()
  content: string;

  @Column()
  expense: number;
}
