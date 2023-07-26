import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { UserEntity } from "../../user/data/user.entity";

@Entity("payment", { schema: "animalnest" })
export class PaymentEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @ManyToOne( () => UserEntity, (User) => User.PaymentEntity )
  @JoinColumn([{name: 'userId', referencedColumnName: 'id'}])

  User: UserEntity | null; // nullable로 변경
  //@JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])

  @Column('int', { name: 'card_num', nullable: true  })
  cardNum: number;

  @Column('varchar', { name: 'end_date', length: 45, nullable: true  })
  endDate: string;

  @Column('int', { name: 'cvc', nullable: true  })
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
    nullable: true 
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

  @Column('int', { name: 'price', nullable: true  })
  price: number;
  
  @Column("boolean", { name: "is_refund", nullable: false, default: 0  })
  isRefund: boolean;
}
