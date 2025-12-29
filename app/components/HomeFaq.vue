<script setup lang="ts">
const faqs = [
  {
    label: 'Was sind Rezepte mit Nährwerten und warum sind sie wichtig?',
    content: 'Rezepte mit Nährwerten zeigen dir genau, wie viele Kalorien, Protein, Kohlenhydrate und Fett eine Mahlzeit enthält. Bei Fit Kitchen berechnen wir alle Makros automatisch, sodass du deine Ernährung optimal auf deine Fitnessziele abstimmen kannst - egal ob Muskelaufbau, Abnehmen oder gesunde Ernährung.'
  },
  {
    label: 'Welche High Protein Rezepte eignen sich für den Muskelaufbau?',
    content: 'Unsere High Protein Rezepte enthalten durchschnittlich über 30g Protein pro Portion und sind ideal für den Muskelaufbau. Besonders beliebt sind Gerichte mit magerem Fleisch, Fisch, Hülsenfrüchten und Milchprodukten. Alle Muskelaufbau Rezepte bei Fit Kitchen sind so konzipiert, dass sie dir helfen, deinen täglichen Proteinbedarf zu decken.'
  },
  {
    label: 'Wie helfen mir eure Rezepte zum Abnehmen?',
    content: 'Unsere Rezepte zum Abnehmen sind kalorienarm, aber trotzdem sättigend dank hohem Proteingehalt. Mit den genauen Nährwertangaben behältst du dein Kaloriendefizit im Blick. Die Rezepte setzen auf viel Gemüse, magere Proteinquellen und komplexe Kohlenhydrate - perfekt für eine nachhaltige Gewichtsreduktion.'
  },
  {
    label: 'Was sind Meal Prep Rezepte und wie spare ich damit Zeit?',
    content: 'Meal Prep Rezepte sind Gerichte, die sich ideal zum Vorkochen eignen. Du bereitest mehrere Portionen auf einmal zu und hast damit gesunde Mahlzeiten für die ganze Woche. Unsere Meal Prep Rezepte sind so konzipiert, dass sie sich gut lagern lassen und auch nach einigen Tagen im Kühlschrank noch lecker schmecken.'
  },
  {
    label: 'Sind die Nährwerte bei euren Rezepten genau berechnet?',
    content: 'Ja, alle Nährwerte werden pro Zutat berechnet und für die gesamte Mahlzeit sowie pro Portion angegeben. So weißt du bei jedem Rezept genau, wie viele Kalorien, Protein, Kohlenhydrate und Fett du zu dir nimmst. Das macht das Tracking deiner Ernährung einfach und zuverlässig.'
  },
  {
    label: 'Gibt es auch vegetarische High Protein Rezepte?',
    content: 'Auf jeden Fall! Wir bieten eine große Auswahl an vegetarischen High Protein Rezepten mit Proteinquellen wie Hülsenfrüchten, Tofu, Tempeh, Eiern und Milchprodukten. Auch ohne Fleisch erreichst du mit unseren Rezepten problemlos einen hohen Proteingehalt für deine Fitnessziele.'
  }
]

// FAQ Structured Data for SEO
const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  'mainEntity': faqs.map(faq => ({
    '@type': 'Question',
    'name': faq.label,
    'acceptedAnswer': {
      '@type': 'Answer',
      'text': faq.content
    }
  }))
}

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(faqJsonLd)
    }
  ]
})
</script>

<template>
  <section class="mt-12 md:mt-16">
    <UContainer>
      <div class="text-center mb-10">
        <h2 class="text-2xl md:text-3xl font-bold mb-3">
          Häufige Fragen zu unseren Rezepten
        </h2>
        <p class="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          Alles was du über Rezepte mit Nährwerten wissen musst
        </p>
      </div>

      <div class="max-w-3xl mx-auto">
        <UAccordion
          :items="faqs"
          multiple
        />
      </div>
    </UContainer>
  </section>
</template>
