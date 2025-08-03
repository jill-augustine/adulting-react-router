import {type ActionFunctionArgs, data, redirect} from "react-router";
import {browserClient as supabase} from "@/lib/client";

export const action = async ({request}: ActionFunctionArgs) => {
  const formData = await request.formData()
  const email = formData.get('email') as string

  const origin = new URL(request.url).origin

  // Send the actual reset password email
  const {error} = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/confirm?next=/update-password`,
  })

  if (error) {
    return data(
      {
        error: error.message ?? 'An error occurred',
        data: {email},
      },
    )
  }

  return redirect('/forgot-password?success')
}