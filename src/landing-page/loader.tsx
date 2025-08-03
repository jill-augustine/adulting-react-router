import {browserClient as supabase} from "@/lib/client";
import {redirect} from "react-router";

export const loader = async () => {
  const {data, error} = await supabase.auth.getUser()
  if (error || !data?.user) {
    console.log(`Error: ${JSON.stringify(error)}`);
    return redirect('login')
  }
  console.log(`Data: ${JSON.stringify(data)}`)
  return redirect('home')
}