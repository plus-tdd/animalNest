
export type ReservationPetInfo ={
    petId: number;
    petType: typeof PetType; // Dog or Cat
    name: string;
    birthDay: string;
    weight: number;
    breed: string;
    gender: typeof Gender; // Male or Female
    neuter: typeof Neuter; // 중성화 True or False 
    allergy: string; // 입력이 되지 않아도 문제 없도록 추후 변경
    disease: string; // 입력이 되지 않아도 문제 없도록 추후 변경
    isAvailable: boolean;
}

const PetType = {
    Cat: 'cat',
    Dog: 'dog'
}

const Gender = {
    Male: 'm',
    Female: 'f'
}

const Neuter = {
    Yes: 'y',
    No: 'n'
}

function choosePet(pet) {
    if (pet === PetType.Cat) {
        return pet
    } else if (pet === PetType.Dog) {
        return pet
    } else {
        console.log('Invalid pet choice.');
    }
}

export type ReservationInfo ={
    petId: number; // Dog or Cat
    userId: number;
    day: string;
    time: string;
    isAvailable: boolean;
}