export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)

  // Validate email
  const email = body.email?.trim()
  if (!email) {
    throw createError({
      statusCode: 400,
      message: 'E-Mail Adresse ist erforderlich.'
    })
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    throw createError({
      statusCode: 400,
      message: 'Bitte gib eine gültige E-Mail Adresse ein.'
    })
  }

  // Mailchimp API configuration
  const apiKey = config.mailchimpApiKey
  const audienceId = config.mailchimpAudienceId
  const dataCenter = apiKey?.split('-').pop()

  if (!apiKey || !audienceId) {
    console.error('Mailchimp configuration missing')
    throw createError({
      statusCode: 500,
      message: 'Newsletter-Service nicht verfügbar.'
    })
  }

  const url = `https://${dataCenter}.api.mailchimp.com/3.0/lists/${audienceId}/members`

  try {
    await $fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from(`anystring:${apiKey}`).toString('base64')}`,
        'Content-Type': 'application/json'
      },
      body: {
        email_address: email,
        status: 'subscribed',
        tags: ['website-signup']
      }
    })

    return {
      success: true,
      message: 'Erfolgreich angemeldet!'
    }
  } catch (error: unknown) {
    const fetchError = error as { data?: { title?: string } }
    const errorBody = fetchError.data

    if (errorBody?.title === 'Member Exists') {
      throw createError({
        statusCode: 400,
        message: 'Diese E-Mail ist bereits angemeldet.'
      })
    }

    if (errorBody?.title === 'Invalid Resource') {
      throw createError({
        statusCode: 400,
        message: 'Bitte gib eine gültige E-Mail Adresse ein.'
      })
    }

    console.error('Mailchimp error:', errorBody)
    throw createError({
      statusCode: 500,
      message: 'Anmeldung fehlgeschlagen. Bitte versuche es später erneut.'
    })
  }
})
