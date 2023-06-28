import { Injectable } from '@nestjs/common';
import { InvalidPetInfoError } from "./pet.error";
import { PetRepositoryImpl } from "./pet.db"
import { CreatePetDto } from "./pet.dto"
import { PetOutPutDto } from "./pet.output.dto"

@Injectable()
export class PetService {

    constructor(private readonly petRepository: PetRepositoryImpl) {}

    async findPetByPetId( petId : number) : Promise<PetOutPutDto> {
        // userId 에 대한 검증은 끝났다고 가정함
        return this.petRepository.findPetByPetId(petId);
    }

    async findAllPetByUserId (userId : number) : Promise<PetOutPutDto[]> {
        // userId 에 대한 검증은 끝났다고 가정함
        return this.petRepository.findAllPetByUserId(userId);
    }

    async create( createPetDto : CreatePetDto ) : Promise<boolean> {
        this.validateCreatePetDto(createPetDto)
        return await this.petRepository.createNewPet(createPetDto)
    }

    private validateCreatePetDto(createPetDto : CreatePetDto) : void {
        const { userId, petType, breed, name, bDay, adoptionDay, weight, gender, neuter, allergy, disease } = createPetDto;
        // 음수
        if (userId < 0) throw new InvalidPetInfoError("userid")
        if (weight < 0) throw new InvalidPetInfoError("weight")
        if (petType === "") throw new InvalidPetInfoError("petType")
        if (breed === "") throw new InvalidPetInfoError("breed")
        if (name === "") throw new InvalidPetInfoError("name")
        if (bDay === "") throw new InvalidPetInfoError("bDay")
        if (adoptionDay === "") throw new InvalidPetInfoError("adoptionDay")
        if (gender === "") throw new InvalidPetInfoError("gender")
        if (neuter === "") throw new InvalidPetInfoError("neuter")
        // if (allergy === "") throw new InvalidPetInfoError("allergy") // 알러지와 질병은 옵셔널하다.
        // if (disease === "") throw new InvalidPetInfoError("disease") // 알러지와 질병은 옵셔널하다.
    }
}
