import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
    try {
        const typesDb = await prisma.type.findMany()
        if (!typesDb.length) {
            const dataApi = await fetch('https://pokeapi.co/api/v2/type')
            const info = await dataApi.json()
            const dataApiPoke = info.results.map(e => e.name)

            dataApiPoke.forEach(async e => {
                await prisma.type.createMany({
                    data: [{
                        name: e
                    }
                    ]
                })
            });

            return NextResponse.json({ tipos: 'cargados correctamente' })
        }
        return NextResponse.json({ tipos: 'ya cargados' })

    } catch (error) {
        console.log(error);
    }

} 