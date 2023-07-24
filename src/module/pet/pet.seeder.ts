import { Inject, Injectable } from "@nestjs/common";
import { DataFactory, FactoryValue, Seeder } from "nestjs-seeder";
import { PetEntity } from "./data/pet.entity";
import { PET_REPOSITORY, PetRepository } from "./domain/pet.repository";

@Injectable()
export class PetSeeder implements Seeder {
    constructor(
      @Inject(PET_REPOSITORY)
      private readonly petRepository : PetRepository
    ) {}

    seed(): Promise<any> {
        const pets = DataFactory.createForClass(PetEntity).generate(50);
        return this.petRepository.createMany(pets);
    }
    drop(): Promise<any> {
        return this.petRepository.deleteAll();
    }
}