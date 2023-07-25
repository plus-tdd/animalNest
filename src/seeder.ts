import { TypeOrmModule } from '@nestjs/typeorm';
import { seeder } from 'nestjs-seeder';
import { DoctorEntity } from './module/doctor/data/doctor.entity';
import { DoctorModule } from './module/doctor/doctor.module';
import { DoctorSeeder } from './module/doctor/doctor.seeder';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserSeeder } from './module/user/user.seeder';
import { UserEntity } from './module/user/data/user.entity';
import { UserModule } from './module/user/user.module';
import { CounselingEntity } from './module/counseling/data/counseling.entity';
import { PaymentEntity } from './module/payment/data/payment.entity';
import { PetEntity } from './module/pet/data/pet.entity';
import { PetSeeder } from './module/pet/pet.seeder';
import { PetModule } from './module/pet/pet.module';
import Logger from './logger';

seeder({
  imports: [
    Logger,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.develop`,
    }),
    PetModule,
    UserModule,
    DoctorModule,
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'mysql',
          host: configService.get('DB_HOST'),
          port: Number(configService.get('DB_PORT')),
          username: configService.get('DB_USER'),
          password: configService.get('DB_PW'),
          database: configService.get('DB_SCHEMA'),
          autoLoadEntities: true,
          synchronize: true,
          dropSchema: true,
          entities: [
            DoctorEntity,
            UserEntity,
            PetEntity,
            CounselingEntity,
            PaymentEntity,
          ],
        };
      },
    }),
    TypeOrmModule.forFeature([
      DoctorEntity,
      UserEntity,
      PetEntity,
      CounselingEntity,
      PaymentEntity,
    ]),
  ],
}).run([DoctorSeeder, UserSeeder, PetSeeder]);
