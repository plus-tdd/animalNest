import { Module } from '@nestjs/common';
import { PetService } from './domain/pet.service';
import { PetRepositoryImpl } from './data/pet.db';
import { PetController } from './api/pet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetEntity } from './data/pet.entity';
import { PET_REPOSITORY } from './domain/pet.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PetEntity])],
  providers: [
    { 
      provide: PET_REPOSITORY, 
      useClass: PetRepositoryImpl,
    },
    PetService,
  ],
  controllers: [PetController],
  exports: [
    { 
      provide: PET_REPOSITORY, 
      useClass: PetRepositoryImpl,
    },
  ]
})
export class PetModule {}
