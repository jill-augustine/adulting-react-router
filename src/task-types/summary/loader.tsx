import {getAllTaskTypes} from "../service.ts";

export const loader = async () => {
  return {data: await getAllTaskTypes()};
}
