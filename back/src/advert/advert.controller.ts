import { Body, Controller, Get, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from 'src/roles/role.enum';
import { Roles } from 'src/roles/roles.decorator';
import { AdvertService } from './advert.service';

@Controller('advert')
export class AdvertController {
    constructor(private readonly advertService: AdvertService) {}

    @Post()
    //@UseGuards(JwtAuthGuard)
    //@Roles(Role.Admin, Role.Client)
    async addAdvert(
        @Body('description') advertDescription: string,
        @Body('km') advertKm: number,
        @Body('release') advertRelease: string,
        @Body('fuel') advertFuel: string,
        @Body('transmission') advertTransmission: string,
        @Body('ref') advertRef: string
    ) {
        const advert = await this.advertService.insertAdvert(
            advertDescription,
            advertKm,
            advertRelease,
            advertFuel,
            advertTransmission,
            advertRef
        )
        return {
            statusCode: HttpStatus.OK,
            message: 'Advert added successfully',
            data: advert
        }
    }
    
    @Get()
    async getAllAdvert() {
        const adverts = await this.advertService.getAdverts()
        return adverts
    }

    @Get(':id')
    getAdvert(@Param('id') advertId: string) {
        return this.advertService.getSingleAdvert(advertId)
    }

    @Patch(':id')
    //@UseGuards(JwtAuthGuard)
    //@Roles(Role.Client, Role.Admin)
    async updateAdvert(
        @Param('id') advertId: string,
        @Body('description') advertDescription: string,
        @Body('km') advertKm: number,
        @Body('release') advertRelease: string,
        @Body('fuel') advertFuel: string,
        @Body('transmission') advertTransmission: string,
        @Body('ref') advertRef: string
    ) {
        const advert = await this.advertService.updateAdvert(
            advertId,
            advertDescription,
            advertKm,
            advertRelease,
            advertFuel,
            advertTransmission,
            advertRef
        )
        return {
            statusCode: HttpStatus.OK,
            message: 'advert updated successfully',
            data: advert
        }
    }
}
