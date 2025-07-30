import {getAllTags} from "@/tags/service";


export const loader = async () => {
  return {data: await getAllTags()};
}