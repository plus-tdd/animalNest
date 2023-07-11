import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { UserEntity } from "../../user/data/user.entity";

@Entity("payment", { schema: "animalnest" })
export class PaymentEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @ManyToOne( () => UserEntity, (User) => User.PaymentEntity )
  @JoinColumn([{name: 'userId', referencedColumnName: 'id'}])

  User: UserEntity;
  //@JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])

  @Column('int', { name: 'card_num' })
  cardNum: number;

  @Column('varchar', { name: 'end_date', length: 45 })
  endDate: string;

  @Column('int', { name: 'cvc' })
  cvc: number;

  @Column('enum', {
    name: 'card_company',
    enum: [
      'kookmin',
      'shinhan',
      'woori',
      'hana',
      'samsung',
      'lotte',
      'hyundai',
      'nonghyup',
    ],
  })
  cardCompany:
    | 'kookmin'
    | 'shinhan'
    | 'woori'
    | 'hana'
    | 'samsung'
    | 'lotte'
    | 'hyundai'
    | 'nonghyup';

  @Column('int', { name: 'price' })
  price: number;
  
  @Column("boolean", { name: "is_refund" })
  isRefund: boolean;
}
