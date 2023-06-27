import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: "Counseling",
    schema: "animalnest",
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
  
    @Column('text', { name: 'content', nullable: true })
    content: string | null;
  
    @Column('int', { name: 'expense' })
    expense: number;
}
