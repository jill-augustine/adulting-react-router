import type {LoaderFunctionArgs} from "react-router-dom";
import {getTaskType} from "@/task-types/service.ts";
import {getAllBoopSizes} from "@/boop-sizes/service.ts";
import {getChore} from "@/chores/service.ts";

export const loader = async ({params}: LoaderFunctionArgs) => {
  return {
    data: {
      chore: await getChore(params.choreId ?? ""),
    }
  };
}