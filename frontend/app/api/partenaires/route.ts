import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const active = searchParams.get('active')
    const category = searchParams.get('category')
    const city = searchParams.get('city')
    const limit = parseInt(searchParams.get('limit') || '50')

    const where: Record<string, unknown> = {}
    
    if (active === 'true') {
      where.isActive = true
    } else if (active === 'false') {
      where.isActive = false
    }

    if (category) {
      where.category = category
    }

    if (city) {
      where.city = {
        contains: city,
        mode: 'insensitive',
      }
    }

    const partners = await prisma.partner.findMany({
      where,
      take: limit,
      orderBy: { name: 'asc' },
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
      },
    })

    // Format for frontend
    const formattedPartners = partners.map((partner) => ({
      ...partner,
      position: partner.latitude && partner.longitude 
        ? [partner.latitude, partner.longitude] as [number, number]
        : null,
    }))

    return NextResponse.json({
      success: true,
      data: formattedPartners,
      total: formattedPartners.length,
    })
  } catch (error) {
    console.error('Partners API error:', error)
    return NextResponse.json(
      { success: false, error: 'Une erreur est survenue' },
      { status: 500 }
    )
  }
}

// Get categories and cities for filters
export async function OPTIONS() {
  try {
    const [categories, cities] = await Promise.all([
      prisma.partner.groupBy({
        by: ['category'],
        _count: { category: true },
        orderBy: { category: 'asc' },
      }),
      prisma.partner.groupBy({
        by: ['city'],
        _count: { city: true },
        orderBy: { city: 'asc' },
      }),
    ])

    return NextResponse.json({
      success: true,
      data: {
        categories: categories.map((c: { category: string; _count: { category: number } }) => ({
          name: c.category,
          count: c._count.category,
        })),
        cities: cities.map((c: { city: string; _count: { city: number } }) => ({
          name: c.city,
          count: c._count.city,
        })),
      },
    })
  } catch (error) {
    console.error('Partners filters API error:', error)
    return NextResponse.json(
      { success: false, error: 'Une erreur est survenue' },
      { status: 500 }
    )
  }
}
