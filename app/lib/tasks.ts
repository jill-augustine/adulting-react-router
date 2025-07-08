import {Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "~/components/ui/card";
import { type TaskType } from "~/lib/task-types";
// TODO: Convert to camel case from snake case

export type Task = {
  id: number;
  tags: null,
  choreId: number;
  dueDate: string;
  startDate: string;
  // Note: the singular "type" not "Types"
  taskType: TaskType;
}
export const data: Task[] = [
  {
    "id": 1,
    "tags": null,
    "choreId": 1,
    "dueDate": "2025-06-10",
    "startDate": "2025-06-03",
    "taskType": {
      "id": 1,
      "name": "Water Plants",
      "boopSize": {
        "id": 1,
        "name": "small",
        "value": 3
      },
      "boopSizeId": 1
    },
    "completedBy": null,
    "taskTypeId": 1,
    "date_completed": "2025-06-10"
  },
  {
    "id": 2,
    "tags": null,
    "choreId": 1,
    "dueDate": "2025-06-17",
    "startDate": "2025-06-10",
    "taskType": {
      "id": 1,
      "name": "Water Plants",
      "boopSize": {
        "id": 1,
        "name": "small",
        "value": 3
      },
      "boopSizeId": 1
    },
    "completedBy": null,
    "taskTypeId": 1,
    "date_completed": "2025-06-17"
  },
  {
    "id": 3,
    "tags": null,
    "choreId": 1,
    "dueDate": "2025-05-23",
    "startDate": "2025-05-12",
    "taskType": {
      "id": 2,
      "name": "Fertilise Plants",
      "boopSize": {
        "id": 2,
        "name": "medium",
        "value": 5
      },
      "boopSizeId": 2
    },
    "completedBy": null,
    "taskTypeId": 2,
    "date_completed": "2025-05-23"
  },
  {
    "id": 4,
    "tags": null,
    "choreId": 1,
    "dueDate": "2025-06-20",
    "startDate": "2025-06-09",
    "taskType": {
      "id": 2,
      "name": "Fertilise Plants",
      "boopSize": {
        "id": 2,
        "name": "medium",
        "value": 5
      },
      "boopSizeId": 2
    },
    "completedBy": null,
    "taskTypeId": 2,
    "date_completed": "2025-06-20"
  },
  {
    "id": 5,
    "tags": null,
    "choreId": 1,
    "dueDate": "2025-06-24",
    "startDate": "2025-06-17",
    "taskType": {
      "id": 1,
      "name": "Water Plants",
      "boopSize": {
        "id": 1,
        "name": "small",
        "value": 3
      },
      "boopSizeId": 1
    },
    "completedBy": null,
    "taskTypeId": 1,
    "date_completed": null
  },
  {
    "id": 6,
    "tags": null,
    "choreId": 1,
    "dueDate": "2025-07-18",
    "startDate": "2025-06-20",
    "taskType": {
      "id": 2,
      "name": "Fertilise Plants",
      "boopSize": {
        "id": 2,
        "name": "medium",
        "value": 5
      },
      "boopSizeId": 2
    },
    "completedBy": null,
    "taskTypeId": 2,
    "date_completed": null
  }
].sort((a, b) => a.id - b.id)