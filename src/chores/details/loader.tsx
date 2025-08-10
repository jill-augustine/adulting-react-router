import type {LoaderFunctionArgs} from "react-router-dom";
import {getChore} from "@/chores/service";

const loader = async ({params}: LoaderFunctionArgs) => {
  return {data: await getChore(parseInt(params.choreId ?? ""))}
}

export {loader}