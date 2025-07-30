import {type Tag} from "@/tags/service";
import {TagCard} from "@/components/tags/tag-card";
import {useLoaderData} from "react-router";

export const Page = () => {
  const {data} = useLoaderData();
  return data.map((tag: Tag) => <TagCard key={tag.id} tag={tag}/>)
}

