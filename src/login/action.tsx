import {type ActionFunctionArgs, redirect} from "react-router";
import {
  browserClient as supabase,
  getTestUserCredentials,
} from "@/lib/client";
import {parseLoginForm} from "@/login/service";

export const action = async ({request}: ActionFunctionArgs) => {
  const formData = await request.formData()
  let email: string
  let password: string
  if (formData.has('is-test-user')) {
    ({email, password} = getTestUserCredentials())
  } else {
    const parsedFormData = parseLoginForm(formData)
    email = parsedFormData.email
    password = parsedFormData.password
  }
  const {error} = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return {
      error: error?.message ?? 'An error occurred',
    }
  }

  return redirect('/home')
}