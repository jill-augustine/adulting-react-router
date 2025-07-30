import {getAllChores} from "@/chores/service";

const loader = async () => {
  return {data: await getAllChores()};
}

export {loader}