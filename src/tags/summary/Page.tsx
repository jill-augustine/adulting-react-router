import {useLoaderData} from "react-router";

export const Page = () => {
  const {data} = useLoaderData();
  // return data.map((tag: Tag) => <TagCard key={tag.id} tag={tag}/>)
  return <div/>
}

