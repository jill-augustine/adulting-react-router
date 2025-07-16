import {type Tag} from "@/lib/tags";
import {TagCard} from "@/components/ui/tag-card";
import {useLoaderData} from "react-router";


export default async () => {
  const {data} = useLoaderData();
  return data.map((tag: Tag) => <TagCard key={tag.id} tag={tag}></TagCard>)
}

