import {type ActionFunctionArgs, redirect} from "react-router";
import {
  browserClient as supabase,
  VITE_SUPABASE_TEST_USER_EMAIL as testUserEmail,
  VITE_SUPABASE_TEST_USER_PASSWORD as testUserPassword
} from "@/lib/client.ts";
import {parseLoginForm} from "@/login/service";

export const action = async ({request}: ActionFunctionArgs) => {
  const formData = await request.formData()
  let email: string
  let password: string
  if (formData.has('is-test-user')) {
    email = testUserEmail
    password = testUserPassword
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

  // TODO: Update this route to redirect to an authenticated route. The user already has an active session.
  return redirect('/protected')
}