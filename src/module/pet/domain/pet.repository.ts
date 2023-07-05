import { CreatePetDto } from "../api/pet.dto"
import { PetOutPutDto } from "./pet.output.dto"

export const PET_REPOSITORY = 'Pet Repository'

export interface PetRepository {
    createNewPet(createPetDto: CreatePetDto) : Promise<boolean>
    findPetByPetId(petId : number) : Promise<PetOutPutDto>
    findAllPetByUserId(userId : number) : Promise<PetOutPutDto[]>
    createMany(pets)
    deleteAll()
}