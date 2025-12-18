import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

// Validation schemas
const particulierSchema = z.object({
  type: z.literal('PARTICULIER'),
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
  recaptchaToken: z.string().optional(),
})

const commercantSchema = z.object({
  type: z.literal('COMMERCANT'),
  companyName: z.string().min(2),
  name: z.string().min(2),
  position: z.string().optional(),
  email: z.string().email(),
  phone: z.string().min(10),
  message: z.string().min(10),
  recaptchaToken: z.string().optional(),
})

const contactSchema = z.discriminatedUnion('type', [particulierSchema, commercantSchema])

// Verify reCAPTCHA token
async function verifyRecaptcha(token: string): Promise<boolean> {
  if (!process.env.RECAPTCHA_SECRET_KEY) {
    console.warn('reCAPTCHA secret key not configured')
    return true // Skip verification in development
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
    })

    const data = await response.json()
    return data.success && data.score >= 0.5
  } catch (error) {
    console.error('reCAPTCHA verification error:', error)
    return false
  }
}

// Send email notification
async function sendEmailNotification(data: z.infer<typeof contactSchema>) {
  // In production, use nodemailer or a service like SendGrid/Resend
  console.log('📧 Email notification:', {
    to: data.type === 'PARTICULIER' 
      ? process.env.CONTACT_EMAIL 
      : process.env.PARTNERS_EMAIL,
    subject: data.type === 'PARTICULIER'
      ? `[Contact] Nouveau message de ${data.name}`
      : `[Partenariat] Demande de ${(data as z.infer<typeof commercantSchema>).companyName}`,
    data,
  })
  
  // TODO: Implement actual email sending with nodemailer
  // const transporter = nodemailer.createTransport({
  //   host: process.env.SMTP_HOST,
  //   port: parseInt(process.env.SMTP_PORT || '587'),
  //   secure: false,
  //   auth: {
  //     user: process.env.SMTP_USER,
  //     pass: process.env.SMTP_PASSWORD,
  //   },
  // })
  
  return true
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input
    const validationResult = contactSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        { success: false, error: 'Données invalides', details: validationResult.error.flatten() },
        { status: 400 }
      )
    }

    const data = validationResult.data

    // Verify reCAPTCHA if token provided
    if (data.recaptchaToken) {
      const isValid = await verifyRecaptcha(data.recaptchaToken)
      if (!isValid) {
        return NextResponse.json(
          { success: false, error: 'Vérification anti-spam échouée' },
          { status: 400 }
        )
      }
    }

    // Save to database
    const contactMessage = await prisma.contactMessage.create({
      data: {
        type: data.type,
        name: data.name,
        email: data.email,
        message: data.message,
        companyName: data.type === 'COMMERCANT' ? data.companyName : null,
        phone: data.type === 'COMMERCANT' ? data.phone : null,
        position: data.type === 'COMMERCANT' ? data.position : null,
      },
    })

    // Send email notification
    await sendEmailNotification(data)

    return NextResponse.json({
      success: true,
      message: 'Message envoyé avec succès',
      id: contactMessage.id,
    })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { success: false, error: 'Une erreur est survenue' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}
