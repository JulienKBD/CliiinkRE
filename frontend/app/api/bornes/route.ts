import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

type BorneSelect = {
  id: string
  name: string
  address: string
  city: string
  zipCode: string
  latitude: number
  longitude: number
  isActive: boolean
  status: string
  description: string | null
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const active = searchParams.get('active')
    const city = searchParams.get('city')
    const limit = parseInt(searchParams.get('limit') || '100')

    const where: Record<string, unknown> = {}
    
    if (active === 'true') {
      where.isActive = true
    } else if (active === 'false') {
      where.isActive = false
    }

    if (city) {
      where.city = {
        contains: city,
        mode: 'insensitive',
      }
    }

    const bornes: BorneSelect[] = await prisma.borne.findMany({
      where,
      take: limit,
      orderBy: { name: 'asc' },
      select: {
        id: true,
        name: true,
        address: true,
        city: true,
        zipCode: true,
        latitude: true,
        longitude: true,
        isActive: true,
        status: true,
        description: true,
      },
    })

    // Format for frontend
    const formattedBornes = bornes.map((borne) => ({
      id: borne.id,
      name: borne.name,
      address: borne.address,
      city: borne.city,
      zipCode: borne.zipCode,
      position: [borne.latitude, borne.longitude] as [number, number],
      isActive: borne.isActive,
      status: borne.status,
      description: borne.description,
    }))

    return NextResponse.json({
      success: true,
      data: formattedBornes,
      total: formattedBornes.length,
    })
  } catch (error) {
    console.error('Bornes API error:', error)
    return NextResponse.json(
      { success: false, error: 'Une erreur est survenue' },
      { status: 500 }
    )
  }
}

// Get cities list for filters
export async function OPTIONS() {
  try {
    const cities = await prisma.borne.groupBy({
      by: ['city'],
      _count: { city: true },
      orderBy: { city: 'asc' },
    })

    return NextResponse.json({
      success: true,
      data: cities.map((c: { city: string; _count: { city: number } }) => ({
        name: c.city,
        count: c._count.city,
      })),
    })
  } catch (error) {
    console.error('Cities API error:', error)
    return NextResponse.json(
      { success: false, error: 'Une erreur est survenue' },
      { status: 500 }
    )
  }
}
