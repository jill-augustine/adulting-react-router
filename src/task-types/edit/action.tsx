import {redirect,} from "react-router";
import type {ActionFunctionArgs,} from "react-router-dom"
import {updateTaskType, parseEditTaskTypeForm} from "@/task-types/service";


export const action = async ({
                               request,
                             }: ActionFunctionArgs): Promise<Response | { error: string }> => {
  try {
    const formData = await request.formData()
    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }
    // UI uses "edit" because it matches the route of the page whereas database uses CRUD
    const parsedFormData = await parseEditTaskTypeForm(formData);
    const taskTypeId = await updateTaskType(parsedFormData.id, parsedFormData.name, parsedFormData.boopSizeId, parsedFormData.tagIds);
    // TODO: Some kind of pop-up showing success
    return redirect(`/task-types/${taskTypeId}`);
  } catch (error) {
    if (error instanceof Error) {
      return {error: error.message};
    } else {
      return {error: 'An error occurred'}
    }
  }
}
