import {Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "~/components/ui/card";
import { type Task } from "~/lib/tasks";

export type Chore = {
  id: number;
  name: string;
  description: string;
  tasks: Task[],
}

export const data: Chore[] = [
  {
    "id": 1,
    "name": "Plant Care",
    "description": "Care for household plants",
    "tasks": [
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
        "dateCompleted": "2025-06-10"
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
        "dateCompleted": "2025-06-17"
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
        "dateCompleted": "2025-05-23"
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
        "dateCompleted": "2025-06-20"
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
        "dateCompleted": null
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
        "dateCompleted": null
      }
    ]
  }
].sort((a, b) => a.id - b.id)