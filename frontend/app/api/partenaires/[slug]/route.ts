import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    const partner = await prisma.partner.findUnique({
      where: { slug },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        logoUrl: true,
        imageUrl: true,
        category: true,
        address: true,
        city: true,
        zipCode: true,
        latitude: true,
        longitude: true,
        phone: true,
        email: true,
        website: true,
        discount: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    if (!partner) {
      return NextResponse.json(
        { success: false, error: 'Partenaire non trouvé' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: {
        ...partner,
        position: partner.latitude && partner.longitude 
          ? [partner.latitude, partner.longitude] as [number, number]
          : null,
      },
    })
  } catch (error) {
    console.error('Partner API error:', error)
    return NextResponse.json(
      { success: false, error: 'Une erreur est survenue' },
      { status: 500 }
    )
  }
}
