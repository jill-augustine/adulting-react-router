import {redirect,} from "react-router";
import type {ActionFunctionArgs,} from "react-router-dom"
import {parseCreateTaskTypeForm, createTaskType,} from "@/task-types/service";


export const action = async ({
                               request,
                             }: ActionFunctionArgs): Promise<Response | { error: string }> => {
  try {
    const formData = await request.formData()
    const parsedFormData = parseCreateTaskTypeForm(formData);
    const taskTypeId = await createTaskType(
      parsedFormData.name,
      parsedFormData.boopSizeId,
      parsedFormData.frequency,
      // parsedFormData.tagIds,
    );
    return redirect(`/task-types/${taskTypeId}`);
  } catch (error) {
    if (error instanceof Error) {
      return {error: error.message};
    } else {
      return {error: 'An error occurred'}
    }
  }
}
