import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Pet } from "./pet.entity";
import { PetRepository } from "./pet.repository";
import { CreatePetDto } from "./pet.dto";
import { PetOutPutDto } from "./pet.output.dto";
import { PetMapper } from "./pet.mapper";

//Injectable이 이걸 다른곳에 주입할수있단거 같음.
@Injectable()
export class PetRepositoryImpl implements PetRepository {
    constructor(
      // DB 주입
      // Pet DB
      @InjectRepository(Pet)
      private PetDB: Repository<Pet>,
    ) {
        this.mapper = new PetMapper()
    }

    private mapper: PetMapper

    async findPetByPetId(petId : number) : Promise<PetOutPutDto> {
        const result = await this.PetDB.findOne({ where : { id : petId } });
        return this.mapper.mapToDto(result)
    }

    async findAllPetByUserId(userId : number) : Promise<PetOutPutDto[]> {
        const result : Pet[] = await this.PetDB.find({ where : { userId : userId } });
        return result.map(x => this.mapper.mapToDto(x))
    }

    async createNewPet(createPetDto: CreatePetDto) : Promise<boolean> {
        const { userId, weight, petType, breed, name, bDay, adoptionDay, gender, neuter, allergy, disease } = createPetDto;
        const entity = await this.PetDB.create({ userId, weight, petType, breed, name, bDay, adoptionDay, gender, neuter, allergy, disease })

        const result = await this.PetDB.insert(entity)

        if (result) {
            return true;
        } else {
            return false
        }
    }


}
