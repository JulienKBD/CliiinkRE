import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Get statistics from database or calculate them
    const [
      bornesCount,
      partnersCount,
      usersCount,
      contactMessagesCount,
    ] = await Promise.all([
      prisma.borne.count({ where: { isActive: true } }),
      prisma.partner.count({ where: { isActive: true } }),
      prisma.user.count(),
      prisma.contactMessage.count(),
    ])

    // Get statistics from Statistics table if exists
    const stats = await prisma.statistics.findFirst({
      orderBy: { createdAt: 'desc' },
    })

    // Get site config values (key-value store)
    const siteConfigs = await prisma.siteConfig.findMany()
    const configMap = Object.fromEntries(
      siteConfigs.map((c) => [c.key, c.value])
    )

    return NextResponse.json({
      success: true,
      data: {
        bornes: bornesCount,
        partners: partnersCount,
        users: usersCount,
        contactMessages: contactMessagesCount,
        // From Statistics table (cumulative data)
        totalGlassCollected: stats?.totalGlassCollected || 450,
        totalPoints: stats?.totalPoints || 25000,
        totalUsers: stats?.totalUsers || usersCount,
        totalPartners: stats?.totalPartners || partnersCount,
        // Site info (from key-value config)
        siteConfig: {
          siteName: configMap['siteName'] || 'Cliiink Réunion',
          contactEmail: configMap['contactEmail'] || 'contact@cliiink-reunion.re',
          contactPhone: configMap['contactPhone'] || '',
        },
      },
    })
  } catch (error) {
    console.error('Statistics API error:', error)
    return NextResponse.json(
      { success: false, error: 'Une erreur est survenue' },
      { status: 500 }
    )
  }
}
