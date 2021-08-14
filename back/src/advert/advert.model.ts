import * as mongoose from 'mongoose'

export const AdvertSchema = new mongoose.Schema({
    description: { type: String, required: true },
    km: { type: Number, required: true },
    release: { type: String, required: true },
    fuel: { type: String, required: true },
    transmission: { type: String, required: true },
    ref: { type: String, required: true },
})

export interface Advert extends mongoose.Document {
    id: string,
    description: string,
    km: number,
    release: string,
    fuel: string,
    transmission: string,
    ref: string
}