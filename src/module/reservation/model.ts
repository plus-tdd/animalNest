
export type ReservationPetInfo ={
    petId: number;
    petType: PetType; // Dog or Cat
    name: string;
    birthDay: string;
    weight: number;
    breed: string;
    gender: Gender; // Male or Female
    neuter: Neuter; // 중성화 True or False 
    allergy: string; // 입력이 되지 않아도 문제 없도록 추후 변경
    disease: string; // 입력이 되지 않아도 문제 없도록 추후 변경
}

export enum PetType {
    Cat = 'cat',
    Dog  ='dog'
}

export enum Gender {
    Male = 'm',
    Female = 'f'
}

export enum Neuter {
    Yes= 'y',
    No= 'n'
}


export type ReservationInfo ={
    petId: number; // Dog or Cat
    userId: number;
    day: string;
    time: string;
    isAvailable: boolean;
}