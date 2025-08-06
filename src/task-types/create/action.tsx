import {redirect,} from "react-router";
import type {ActionFunctionArgs,} from "react-router-dom"
import {addTaskType, parseTaskTypeForm} from "@/task-types/service";


export const action = async ({
                               request,
                             }: ActionFunctionArgs): Promise<Response | { error: string }> => {
  try {
    // validate and parse? using zod?
    const formData = await request.formData()
    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }
    const parsedFormData = await parseTaskTypeForm(formData);
    const taskTypeId = await addTaskType(parsedFormData.name, parsedFormData.boopSizeId, parsedFormData.tagIds);
    return redirect(`/task-types/${taskTypeId}`);
  } catch (error) {
    if (error instanceof Error) {
      return {error: error.message};
    } else {
      return {error: 'An error occurred'}
    }
  }
}
