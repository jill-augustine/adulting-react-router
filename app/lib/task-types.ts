import {Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "~/components/ui/card";
import { type BoopSize } from "~/lib/boop-sizes";

export type TaskType = {
  id: number;
  boopSize: BoopSize
  name: string;
  boopSizeId: number;
}
export const data: TaskType[] = [
  {
    "id": 1,
    "name": "Water Plants",
    "boopSize": {
      "id": 1,
      "name": "small",
      "value": 3
    },
    "boopSizeId": 1,
  },
  {
    "id": 2,
    "name": "Fertilise Plants",
    "boopSize": {
      "id": 2,
      "name": "medium",
      "value": 5
    },
    "boopSizeId": 2
  }
].sort((a, b) => a.id - b.id)