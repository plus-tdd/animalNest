import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { PetService } from "../domain/pet.service";
import { CreatePetDto } from "./pet.dto";
import { JwtAuthGuard } from "../../auth/auth.jwtAuthGuard";

@Controller('pet')
export class PetController {
    constructor(private readonly petService : PetService) {}

    @UseGuards(JwtAuthGuard)
    @Post('create')
    create(@Body() createPetDto : CreatePetDto) {
        return this.petService.create(createPetDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('mypet/:id')
    findMyPets( @Param('id') petId: number ) {
        return this.petService.findAllPetByUserId(petId)
    }
}
