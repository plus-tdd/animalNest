import { Module } from '@nestjs/common';
import { PetService } from './pet.service';
import { PetRepositoryImpl } from './pet.db';
import { PetRepository } from './pet.repository';
import { PetController } from './pet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pet } from './pet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pet])],
  controllers: [PetController],
  providers: [
    PetService,
    { provide: 'PetRepository', useClass: PetRepositoryImpl },
  ],
})
export class PetModule {}
