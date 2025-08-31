import type {LoaderFunctionArgs} from "react-router-dom";
import {getChore} from "@/chores/service.ts";

export const loader = async ({params}: LoaderFunctionArgs) => {
  return {
    data: {
      chore: await getChore(params.choreId ?? ""),
    }
  };
}