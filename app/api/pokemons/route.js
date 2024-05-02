import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
    try {
        let dataApi = await fetch('https://pokeapi.co/api/v2/pokemon?limit=40')
        let info = await dataApi.json()
        let dataApiJson = info.results;
        for (let e of dataApiJson) {
            const infoLinkApi = await fetch(e.url)
            const data = await infoLinkApi.json()
            e.id = data.id;
            e.image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg`;
            e.types = data.types.map(i => i.type.name);
            e.attack = data.stats[1]['base_stat'];
            e.hp = data.stats[0]['base_stat'];
            e.defense = data.stats[2]['base_stat'];
        }
        let dataDb = await prisma.pokemon.findMany({
            include: {
                types: true
            }
            
        })
        if (!dataDb.length) {
            return NextResponse.json(dataApiJson)
        }
        let allData = dataDb.concat(dataApiJson)
        return NextResponse.json(allData)

    } catch (error) {
        console.log(error);
    }
}
