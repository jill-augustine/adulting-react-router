import {browserClient as supabase} from '@/lib/client.ts'
import {type ActionFunctionArgs, redirect,} from 'react-router'
import {parseSignUpForm} from "@/sign-up/service";

export const action = async ({request}: ActionFunctionArgs) => {
  const url = new URL(request.url)
  const origin = url.origin

  const parsedFormData = parseSignUpForm(await request.formData())

  const {error} = await supabase.auth.signUp({
    email: parsedFormData.email,
    password: parsedFormData.password,
    options: {
      emailRedirectTo: `${origin}/home`,
      data: {
        displayName: parsedFormData.displayName
      }
    },
  })

  if (error) {
    return {error: error.message}
  }

  return redirect('/sign-up?success')
}
