import { NextResponse, NextRequest } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function DELETE(context, { params }) {
    try {
        const { idPoke } = await params;
        const pokeDelete = await prisma.pokemon.delete({
            where: {

                id: parseInt(idPoke)
            }
        })
        return NextResponse.json(pokeDelete)
    } catch (error) {
        console.error(error)
    }
}



