import { Column, Entity, JoinColumn, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "../../user/user.entity"

@Entity({
    name: "Counseling",
    schema: "animalNest",
})
export class CounselingEntity {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column('int', { name: 'doctor_id' })
    doctorId: number;
  
    @Column('int', { name: 'userId' })
    userId: number;
    @ManyToOne( () => User, (User) => User.CounselingEntity )
    @JoinColumn([{name: 'userId', referencedColumnName: 'id'}])
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
