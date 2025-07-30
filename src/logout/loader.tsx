import {browserClient as supabase} from "@/lib/client";
import {redirect} from "react-router";

export const loader = async () => {
  const {error} = await supabase.auth.signOut()

  if (error) {
    console.error(error)
    return {success: false, error: error.message}
  }

  // Redirect to dashboard or home page after successful sign-out
  return redirect('/')
}