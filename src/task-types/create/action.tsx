import {redirect,} from "react-router";
import type {ActionFunctionArgs,} from "react-router-dom"
import {addTaskType, parseTaskTypeForm} from "@/task-types/service";


export const action = async ({
                               request,
                             }: ActionFunctionArgs): Promise<Response | { errors: unknown[] }> => {
  try {
    // validate and parse? using zod?
    const parsedFormData = await parseTaskTypeForm(await request.formData());
    const taskTypeId = await addTaskType(parsedFormData.name, parsedFormData.boopSize, parsedFormData.tags);
    return redirect(`/task-types/${taskTypeId}`);
  } catch (error) {
    return {errors: [error]}
  }
}
