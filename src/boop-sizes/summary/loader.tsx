import {getAllBoopSizes} from "@/boop-sizes/service";

const loader = async () => {
  return {data: await getAllBoopSizes()};
}

export {loader}