import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CounselingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  counselingDateTime: Date;
}
