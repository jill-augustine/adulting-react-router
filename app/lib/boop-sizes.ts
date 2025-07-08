export type BoopSize = {
  id: number;
  name: string;
  value: number;
}
export const data: BoopSize[] = [
  {
    "id": 1,
    "name": "small",
    "value": 3
  },
  {
    "id": 2,
    "name": "medium",
    "value": 5
  }
].sort((a, b) => a.value - b.value)
