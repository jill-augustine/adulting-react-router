import * as z from "zod";

export const parseSettingsForm = (formData: FormData) => {
  const settingsFormSchema = z.object({
    displayName: z.string().optional(),
    password: z.string().optional(),
    "repeat-password": z.string().optional(),
  }).refine((data) => data.password === data["repeat-password"], {
    message: "Passwords don't match",
    path: ["repeat-password"], // path of error
  });
  const {data: parsedFormData, error} = settingsFormSchema.safeParse({
    displayName: formData.get('display-name'),
    password: formData.get('password'),
    "repeat-password": formData.get('repeat-password'),
  })
  if (error) throw error
  return parsedFormData
}