interface Env {
  MAILCHIMP_API_KEY: string
  MAILCHIMP_AUDIENCE_ID: string
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context

  try {
    const body = await request.json() as { email?: string }
    const email = body.email?.trim()

    if (!email) {
      return Response.json(
        { message: 'E-Mail Adresse ist erforderlich.' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return Response.json(
        { message: 'Bitte gib eine gültige E-Mail Adresse ein.' },
        { status: 400 }
      )
    }

    const apiKey = env.MAILCHIMP_API_KEY
    const audienceId = env.MAILCHIMP_AUDIENCE_ID
    const dataCenter = apiKey?.split('-').pop()

    if (!apiKey || !audienceId) {
      return Response.json(
        { message: 'Newsletter-Service nicht verfügbar.' },
        { status: 500 }
      )
    }

    const url = `https://${dataCenter}.api.mailchimp.com/3.0/lists/${audienceId}/members`

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${btoa(`anystring:${apiKey}`)}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email_address: email,
        status: 'subscribed',
        tags: ['website-signup']
      })
    })

    if (!response.ok) {
      const errorBody = await response.json() as { title?: string }

      if (errorBody?.title === 'Member Exists') {
        return Response.json(
          { message: 'Diese E-Mail ist bereits angemeldet.' },
          { status: 400 }
        )
      }

      if (errorBody?.title === 'Invalid Resource') {
        return Response.json(
          { message: 'Bitte gib eine gültige E-Mail Adresse ein.' },
          { status: 400 }
        )
      }

      return Response.json(
        { message: 'Anmeldung fehlgeschlagen. Bitte versuche es später erneut.' },
        { status: 500 }
      )
    }

    return Response.json({ success: true, message: 'Erfolgreich angemeldet!' })
  } catch {
    return Response.json(
      { message: 'Anmeldung fehlgeschlagen. Bitte versuche es später erneut.' },
      { status: 500 }
    )
  }
}
