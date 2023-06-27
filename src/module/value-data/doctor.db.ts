import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export type Doctor = {
    id: number,
    name: string,
    hospital: string,
}

@Entity({
    name: "Doctor",
})
export class DoctorEntity {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number

    @Column({ type: "varchar", length: 20 })
    name: string

    @Column({ type: "varchar", length: 20 })
    hospital: string
}