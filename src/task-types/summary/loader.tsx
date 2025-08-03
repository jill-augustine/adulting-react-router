import {getAllTaskTypes} from "../service";

export const loader = async () => {
  return {data: await getAllTaskTypes()};
}
