import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    const article = await prisma.article.findUnique({
      where: { slug },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        content: true,
        imageUrl: true,
        category: true,
        tags: true,
        isPublished: true,
        isFeatured: true,
        publishedAt: true,
        createdAt: true,
        updatedAt: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    })

    if (!article) {
      return NextResponse.json(
        { success: false, error: 'Article non trouvé' },
        { status: 404 }
      )
    }

    // Check if article is published
    if (!article.isPublished || (article.publishedAt && article.publishedAt > new Date())) {
      return NextResponse.json(
        { success: false, error: 'Article non disponible' },
        { status: 404 }
      )
    }

    // Get related articles
    const relatedArticles = await prisma.article.findMany({
      where: {
        id: { not: article.id },
        isPublished: true,
        publishedAt: { lte: new Date() },
        OR: [
          { category: article.category },
          { tags: { hasSome: article.tags } },
        ],
      },
      take: 3,
      orderBy: { publishedAt: 'desc' },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        imageUrl: true,
        category: true,
        publishedAt: true,
      },
    })

    return NextResponse.json({
      success: true,
      data: {
        ...article,
        relatedArticles,
      },
    })
  } catch (error) {
    console.error('Article API error:', error)
    return NextResponse.json(
      { success: false, error: 'Une erreur est survenue' },
      { status: 500 }
    )
  }
}
