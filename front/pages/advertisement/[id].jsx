import React from 'react'
import Header from '../../components/organisms/header/Header'

function Adv({advert}) {
    return (
        <div>
            <Header/>

            
        </div>
    )
}

export default Adv

export async function getStaticProps( {params}) {

    const advert = await fetch(`http://localhost:4000/advert/${params.id}`)
    .then((res) => res.json())

    return {
        props: {
            advert
        }
    }
}

export async function getStaticPaths() {

    const adverts = await fetch(`http://localhost:4000/advert`)
    .then((res) => res.json())

    return {
        paths: adverts.map((advert) => ({
        params: { id: advert.id.toString() },
        })),
        fallback: false,
    };
}