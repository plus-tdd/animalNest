import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity("payment", { schema: "animalnest" })
export class PaymentUserEntity {
    @PrimaryGeneratedColumn({ type: "int", name: "id" })
    id: number;

    @Column("int", { name: "phone_number" })
    phoneNumber: number;
}