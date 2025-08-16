import * as z from "zod";

export const parseSignUpForm = (formData: FormData) => {
  console.log(formData)
  const signUpFormSchema = z.object({
    email: z.email(),
    displayName: z.string(),
    password: z.string(),
    "repeat-password": z.string(),
  }).refine((data) => data.password === data["repeat-password"], {
    message: "Passwords don't match",
    path: ["repeat-password"], // path of error
  });
  const {data: parsedFormData, error} = signUpFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
    displayName: formData.get('display-name'),
    "repeat-password": formData.get('repeat-password'),
  })
  if (error) throw error
  return parsedFormData
}