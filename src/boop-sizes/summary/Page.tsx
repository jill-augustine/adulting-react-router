import {useLoaderData} from "react-router";
import type {BoopSize} from "@/boop-sizes/service";
import {Components} from "@/boop-sizes/summary/components.tsx";

const Page = () => {
  const {data} = useLoaderData();
  return data.map((boopSize: BoopSize) => <Components key={boopSize.id} boopSize={boopSize}/>)
}

export {Page}