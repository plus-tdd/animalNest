import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../../user/user.entity";

@Entity("payment", { schema: "animalNest" })
export class Payment {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "userId" })
  userId: number;
  @ManyToOne( () => User, (User) => User.Payment )
  @JoinColumn([{name: 'userId', referencedColumnName: 'id'}])
  User: User;

  @Column("int", { name: "card_num" })
  cardNum: number;

  @Column("varchar", { name: "end_date", length: 45 })
  endDate: string;

  @Column("int", { name: "cvc" })
  cvc: number;

  @Column("enum", {
    name: "card_company",
    enum: [
      "kookmin",
      "shinhan",
      "woori",
      "hana",
      "samsung",
      "lotte",
      "hyundai",
      "nonghyup",
    ],
  })
  cardCompany:
    | "kookmin"
    | "shinhan"
    | "woori"
    | "hana"
    | "samsung"
    | "lotte"
    | "hyundai"
    | "nonghyup";

  @Column("int", { name: "price" })
  price: number;
}
