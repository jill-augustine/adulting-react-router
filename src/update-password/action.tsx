import {browserClient as supabase} from '@/lib/client.ts'
import {type ActionFunctionArgs, redirect} from 'react-router'

export const action = async ({request}: ActionFunctionArgs) => {
  const formData = await request.formData()
  const password = formData.get('password') as string

  if (!password) {
    return {error: 'Password is required'}
  }

  const {error} = await supabase.auth.updateUser({password: password})

  if (error) {
    return {
      error: error instanceof Error ? error.message : 'An error occurred',
    }
  }

  // Redirect to sign-in page after successful password update
  // TODO: replace the "protected" page with the "home" page
  //  which is different from the "/" landing page
  return redirect('/protected')
}
