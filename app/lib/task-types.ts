import { type BoopSize } from "~/lib/boop-sizes";

type TaskType = {
  id: number;
  // Note: Not "boop_sizes" as in ReturnedTaskType
  boopSize: BoopSize
  name: string;
  boopSizeId: number;
}

export { type TaskType };