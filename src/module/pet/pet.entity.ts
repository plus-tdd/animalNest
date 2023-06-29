import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "../user/user.entity"

@Entity({
    name: "pet",
    schema: "animalNest",
})
export class Pet {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Column( 'int')
    userId: number;
    @ManyToOne( () => User, (User) => User.Pet )
    @JoinColumn([{name: 'userId', referencedColumnName: 'id'}])
    User: User;

    @Column('varchar', { length: 45 })
    petType: string;

    @Column('varchar', { length: 45 })
    breed: string;

    @Column('varchar', { length: 45 })
    name: string;

    @Column('varchar', { length: 45 })
    bDay: string;

    @Column('varchar', { length: 45 })
    adoptionDay: string;

    @Column('int')
    weight: number;

    @Column('varchar', { length: 45 })
    gender: string;

    @Column('varchar', { length: 45 })
    neuter: string;

    @Column('varchar', { length: 45 })
    allergy: string;

    @Column('varchar', { length: 45 })
    disease: string;

    @Column('datetime')
    createdAt: Date;

    @Column('datetime')
    updatedAt: Date;
}
