import type {LoaderFunctionArgs} from "react-router-dom";
import {getTaskType} from "@/task-types/service.ts";
import {getAllBoopSizes} from "@/boop-sizes/service.ts";

export const loader = async ({params}: LoaderFunctionArgs) => {
  return {
    data: {
      taskType: await getTaskType(parseInt(params.taskTypeId ?? "")),
      boopSizes: await getAllBoopSizes(),
    }
  };
}