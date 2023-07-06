export class CreatePetDto {
    userId : number
    weight : number
    petType : string
    breed : string
    name : string
    bDay : string
    adoptionDay : string
    gender : string
    neuter ?: string
    allergy ?: string
    disease ?: string
}