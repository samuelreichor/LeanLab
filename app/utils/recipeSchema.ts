type MinimarkNode = string | [string, Record<string, unknown>, ...MinimarkNode[]]

interface HowToStep {
  '@type': 'HowToStep'
  'name': string
  'text': string
}

const categoryKeywords: Record<string, string> = {
  'meal-prep': 'Meal Prep',
  'muskel-aufbau': 'Muskelaufbau',
  'abnehmen': 'Abnehmen',
  'vegetarisch': 'Vegetarisch'
}

function nodeText(node: MinimarkNode): string {
  if (typeof node === 'string') return node
  const [, , ...children] = node
  return children.map(nodeText).join('')
}

/**
 * Extracts schema.org HowToSteps from the "## Zubereitung" section of a recipe body.
 * Each "### Schritt N: Titel" heading becomes a step, the following paragraphs/lists its text.
 */
export function extractRecipeSteps(body: { value?: MinimarkNode[] } | undefined): HowToStep[] {
  const steps: HowToStep[] = []
  let inPreparation = false

  for (const node of body?.value ?? []) {
    if (typeof node === 'string') continue
    const tag = node[0]

    if (tag === 'h2') {
      inPreparation = nodeText(node).trim() === 'Zubereitung'
      continue
    }
    if (!inPreparation) continue

    if (tag === 'h3') {
      steps.push({
        '@type': 'HowToStep',
        'name': nodeText(node).replace(/^Schritt\s*\d+\s*:\s*/i, '').trim(),
        'text': ''
      })
      continue
    }

    const current = steps.at(-1)
    const text = nodeText(node).replace(/\s+/g, ' ').trim()
    if (current && text) {
      current.text = current.text ? `${current.text} ${text}` : text
    }
  }

  return steps.filter(step => step.text)
}

export function recipeKeywords(title: string, categories: string[] = []): string[] {
  return [
    'High Protein',
    ...categories.map(cat => categoryKeywords[cat] ?? cat),
    title
  ]
}
