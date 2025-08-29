import * as z from 'zod'

export const taskTypeSelect = `
  id,
  name,
  frequency,
  `

export const taskTypeFormSchema = z.object({
  name: z.string(),
  frequency: z.union([z.string(), z.number()]).transform((value) => value === 'string' ? parseInt(value) : value),
})