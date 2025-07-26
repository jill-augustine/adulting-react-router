import {getAllTags} from "@/tags/service.ts";


export const loader = async () => {
  return {data: await getAllTags()};
}