import {NextResponse} from 'next/server'
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
    return NextResponse.json({pokemons:'cargados'})
} 
export async function POST() {}