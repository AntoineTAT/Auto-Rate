import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Advert } from './advert.model';

@Injectable()
export class AdvertService {
    constructor(
        @InjectModel('Advert') private readonly AdvertModel: Model<Advert>,
    ) {}


    //POST
    async insertAdvert(
        description: string,
        km: number,
        release: string,
        fuel: string,
        transmission: string,
        ref: string
    ) {
        const newAdvert = new this.AdvertModel({
            description,
            km,
            release,
            fuel,
            transmission,
            ref
        })

        const result = await newAdvert.save()
        return result
    }

    //GET ALL
    async getAdverts() {
        const adverts = await this.AdvertModel.find().exec()
        return adverts.map((Advert) => ({
            id: Advert.id,
            description: Advert.description,
            km: Advert.km,
            release: Advert.release,
            fuel: Advert.fuel,
            transmission: Advert.transmission,
            ref: Advert.ref
        }))
    }


    //GET ID
    async getSingleAdvert(AdvertId: string) {
        const Advert = await this.findAdvert(AdvertId)
        return {
            id: Advert.id,
            description: Advert.description,
            km: Advert.km,
            release: Advert.release,
            fuel: Advert.fuel,
            transmission: Advert.transmission,
            ref: Advert.ref
        }
    }


    //PATCH
    async updateAdvert(
        AdvertId: string,
        description: string,
        km: number,
        release: string,
        fuel: string,
        transmission: string,
        ref: string
    ) {
        const updatedAdvert = await this.findAdvert(AdvertId)
        if (description) {
            updatedAdvert.description = description
        }
        if (km) {
            updatedAdvert.km = km
        }
        if (release) {
            updatedAdvert.release = release
        }
        if (fuel) {
            updatedAdvert.fuel = fuel
        }
        if (transmission) {
            updatedAdvert.transmission = transmission
        }
        if (ref) {
            updatedAdvert.ref = ref
        }
        updatedAdvert.save()
        return updatedAdvert
    }   


    //DELETE
    async deleteAdvert(AdvertId: string) {
        const result = await this.AdvertModel.deleteOne({ _id: AdvertId}).exec()
        if (result.n === 0) {
            throw new NotFoundException('Could not find Advert.')
        }
        return true
    }

    private async findAdvert(id : string): Promise<Advert> {
        let Advert;
        try {
            Advert = await this.AdvertModel.findById(id).exec()
        } catch (error) {
            throw new NotFoundException('Could not find Advert.')
        }
        if (!Advert) {
            throw new NotFoundException('Could not find Advert.')
        }
        return Advert
    }

}
