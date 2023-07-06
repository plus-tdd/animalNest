import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Factory } from "nestjs-seeder";

@Entity({
    name: "Doctor",
})
export class DoctorEntity {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number

    @Factory((faker) => faker.person.fullName())
    @Column({ type: "varchar", length: 100 })
    name: string

    @Factory((faker) => faker.company.name())
    @Column({ type: "varchar", length: 100 })
    hospital: string
}
