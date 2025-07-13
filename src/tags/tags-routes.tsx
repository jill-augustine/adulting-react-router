import {type Tag, getAllTags} from "@/tags/tags.service";
import {TagCard} from "@/components/ui/tag-card";
import {useLoaderData} from "react-router";

export {
  SummaryRoute,
  summaryLoader,
}

const SummaryRoute = () => {
  const {data} = useLoaderData();
  return data.map((tag: Tag) => <TagCard key={tag.id} tag={tag}></TagCard>)
}

const summaryLoader = async () => {
  return {data: await getAllTags()};
}