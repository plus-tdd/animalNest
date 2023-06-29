import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("counseling", { schema: "animalNest" })
export class Counseling {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "user_id" })
  userId: number;

  @Column("int", { name: "pet_id" })
  petId: number;

  @Column("datetime", { name: "counseling_date_time" })
  counselingDateTime: Date;

  @Column("text", { name: "content", nullable: true })
  content: string | null;

  @Column("int", { name: "expense" })
  expense: number;
}
