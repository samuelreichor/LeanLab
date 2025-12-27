import { defineCollection, z } from '@nuxt/content'

const categoryEnum = z.enum(['meal-prep', 'muskel-aufbau', 'abnehmen', 'vegetarisch'])
const difficultyEnum = z.enum(['einfach', 'mittel', 'schwierig'])

const ingredientSchema = z.object({
  name: z.string(),
  amount: z.number(),
  unit: z.string()
})

const macrosSchema = z.object({
  kcal: z.number(),
  protein: z.number(),
  carbs: z.number(),
  fat: z.number()
})

export const collections = {
  recipes: defineCollection({
    source: 'r/**/*.md',
    type: 'page',
    schema: z.object({
      title: z.string(),
      description: z.string(),
      image: z.string().editor({ input: 'media' }),
      category: z.array(categoryEnum),
      prepTime: z.number(),
      difficulty: difficultyEnum,
      servings: z.number().default(4),
      macros: macrosSchema,
      ingredients: z.array(ingredientSchema)
    })
  })
}
