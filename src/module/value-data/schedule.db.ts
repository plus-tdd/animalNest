import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export type Schedule = {
  id: number;
  doctorId: number;
  scheduleTime: Date;
  isReserved: boolean;
};

@Entity({
  name: 'Schedule',
})
export class DoctorEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column({ type: 'int', name: 'doctorId' })
  doctorId: number;

  @Column({ type: 'datetime', name: 'scheduleTime' })
  scheduleTime: number;

  @Column({ type: 'tinyint', name: 'isReserved' })
  isReserved: boolean;
}
