import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const published = searchParams.get('published')
    const featured = searchParams.get('featured')
    const category = searchParams.get('category')
    const limit = parseInt(searchParams.get('limit') || '20')
    const page = parseInt(searchParams.get('page') || '1')

    const where: Record<string, unknown> = {}
    
    if (published === 'true') {
      where.isPublished = true
      where.publishedAt = { lte: new Date() }
    } else if (published === 'false') {
      where.isPublished = false
    }

    if (featured === 'true') {
      where.isFeatured = true
    }

    if (category) {
      where.category = category
    }

    const [articles, total] = await Promise.all([
      prisma.article.findMany({
        where,
        take: limit,
        skip: (page - 1) * limit,
        orderBy: { publishedAt: 'desc' },
        select: {
          id: true,
          title: true,
          slug: true,
          excerpt: true,
          imageUrl: true,
          category: true,
          tags: true,
          isPublished: true,
          isFeatured: true,
          publishedAt: true,
          author: {
            select: {
              name: true,
            },
          },
        },
      }),
      prisma.article.count({ where }),
    ])

    return NextResponse.json({
      success: true,
      data: articles,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Articles API error:', error)
    return NextResponse.json(
      { success: false, error: 'Une erreur est survenue' },
      { status: 500 }
    )
  }
}

// Get categories for filters
export async function OPTIONS() {
  try {
    const categories = await prisma.article.groupBy({
      by: ['category'],
      _count: { category: true },
      orderBy: { category: 'asc' },
      where: { 
        isPublished: true,
        publishedAt: { lte: new Date() },
      },
    })

    return NextResponse.json({
      success: true,
      data: categories.map((c: { category: string; _count: { category: number } }) => ({
        name: c.category,
        count: c._count.category,
      })),
    })
  } catch (error) {
    console.error('Categories API error:', error)
    return NextResponse.json(
      { success: false, error: 'Une erreur est survenue' },
      { status: 500 }
    )
  }
}
