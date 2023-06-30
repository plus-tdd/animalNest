import { Module } from '@nestjs/common';
import { PetService } from './pet.service';
import { PetRepositoryImpl } from './pet.db';
import { PetController } from './pet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pet } from './pet.entity';
import { PET_REPOSITORY } from './pet.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Pet])],
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
