import * as z from 'zod'

export type TaskType = {
  name: string;
  frequency: string;
}

export const taskTypeFormSchema = z.object({
  name: z.string(),
  frequency: z.union([z.string(), z.number()]).transform((value) => value === 'string' ? parseInt(value) : value),
})