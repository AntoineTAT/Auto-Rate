import { Injectable, HttpStatus } from '@nestjs/common';

@Injectable()
export class AutovisualService {

    async normalPricing(
        txt: string,
        km: number,
        dt_entry_service: string,
        fuel: string,
        transmission: string,
        country_ref: string
    )   {

        const fetch = require("node-fetch")

        var requestOptions = {
            method: 'POST',
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
                key: process.env.AUTOVISUAL_API_KEY,
                txt: txt,
                km: km,
                dt_entry_service: dt_entry_service,
                fuel: fuel,
                transmission: transmission,
                country_ref: country_ref,
                value: "true",
                transaction: "true",
                market: "true"
            }),
            redirect: 'follow'
        };

        var res = ""

        await fetch("https://api.autovisual.com/v2/av", requestOptions)
            .then(response => response.json())
            .then(result => {res=result.value, console.log("response autovisual :", res)})
            .catch(error => console.log('error', error))
        
        return res
    }

    async vipPricing(
        txt: string,
        km: number,
        dt_entry_service: string,
        fuel: string,
        transmission: string,
        country_ref: string,
        dt_valuation: string
    )   {

        const fetch = require("node-fetch")

        var requestOptions = {
            method: 'POST',
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
                key: process.env.AUTOVISUAL_API_KEY,
                txt: txt,
                km: km,
                dt_entry_service: dt_entry_service,
                fuel: fuel,
                dt_valuation: dt_valuation,
                transmission: transmission,
                country_ref: country_ref,
                value: "true",
                transaction: "true",
                market: "true"
            }),
            redirect: 'follow'
        };

        var res = ""

        await fetch("https://api.autovisual.com/v2/av", requestOptions)
            .then(response => response.json())
            .then(result => {res=result.value, console.log("response autovisual :", res)})
            .catch(error => console.log('error', error))
        
        return res
    }
}
