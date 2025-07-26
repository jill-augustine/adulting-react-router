import * as z from "zod";

const loginFormSchema = z.object({
  email: z.email(),
  password: z.string(),
});
type LoginFormData = z.infer<typeof loginFormSchema>

export const parseLoginForm = (formData: FormData): LoginFormData => {
  const {data: parsedFormData, error} = loginFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })
  if (error) throw error
  return parsedFormData
}