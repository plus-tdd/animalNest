import { CreatePetDto } from "./pet.dto"
import { PetOutPutDto } from "./pet.output.dto"

export interface PetRepository {
    createNewPet(createPetDto: CreatePetDto) : Promise<boolean>
    findPetByPetId(petId : number) : Promise<PetOutPutDto>
    findAllPetByUserId(userId : number) : Promise<PetOutPutDto[]>
}