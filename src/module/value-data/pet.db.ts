import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


export type Pet = {
    id: number,
    name: string,
    age: number,
}

@Entity({
    name: "Pet",
})
export class PetEntity {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number

    @Column({ type: "varchar", length: 20 })
    name: string

    @Column({ type: "int", width: 10 })
    age: number
}