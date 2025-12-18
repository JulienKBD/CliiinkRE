import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const borne = await prisma.borne.findUnique({
      where: { id },
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
        createdAt: true,
        updatedAt: true,
      },
    })

    if (!borne) {
      return NextResponse.json(
        { success: false, error: 'Borne non trouvée' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: {
        ...borne,
        position: [borne.latitude, borne.longitude] as [number, number],
      },
    })
  } catch (error) {
    console.error('Borne API error:', error)
    return NextResponse.json(
      { success: false, error: 'Une erreur est survenue' },
      { status: 500 }
    )
  }
}
