import {browserClient as supabase} from "@/lib/client";
import {redirect} from "react-router";

const loader = async () => {

  const {data, error} = await supabase.auth.getUser()
  if (error || !data?.user) {
    return redirect('/login')
  }

  return data
}

export {loader}