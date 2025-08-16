import type {LoaderFunctionArgs} from "react-router-dom";
import {getTaskType} from "@/task-types/service.ts";
import {getAllBoopSizes} from "@/boop-sizes/service.ts";
import {browserClient as supabase} from "@/lib/client.ts";

export type SettingsLoaderData = { data: { displayName: string } }

export const loader = async ({params}: LoaderFunctionArgs): Promise<SettingsLoaderData> => {
  const {data, error} = await supabase.auth.getUser()
  if (error || !data?.user) {
    console.log(`Error: ${JSON.stringify(error)}`);
    throw new Error("Could not fetch user data.")
  }
  return {data: {displayName: data.user.user_metadata?.displayName || ""}};
}
