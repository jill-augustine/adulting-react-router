import {browserClient as supabase} from '@/lib/client.ts'
import {type ActionFunctionArgs, redirect} from 'react-router'
import {parseSettingsForm} from "@/settings/service.ts";
import type {UserAttributes} from "@supabase/supabase-js";

export const action = async ({request}: ActionFunctionArgs) => {
  const formData = await request.formData()
  const parsedFormData = parseSettingsForm(formData)

  const dataToUpdate: UserAttributes = {
    ...(parsedFormData?.password && {password: parsedFormData?.password}),
    ...(parsedFormData?.displayName && {data: {displayName: parsedFormData.displayName}}),
  }

  const {error} = await supabase.auth.updateUser(dataToUpdate)

  if (error) {
    return {
      error: error instanceof Error ? error.message : 'An error occurred',
    }
  }

  // Redirect to sign-in page after successful password update
  // Update to a toaster.
  return redirect('/home')
}
