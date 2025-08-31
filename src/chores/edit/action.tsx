import {redirect,} from "react-router";
import type {ActionFunctionArgs,} from "react-router-dom"
import {parseEditChoreForm, updateChore} from "@/chores/service";


export const action = async ({
                               request,
                             }: ActionFunctionArgs): Promise<Response | { error: string }> => {
  try {
    const formData = await request.formData()
    const parsedFormData = parseEditChoreForm(formData);
    console.log("Edit Action", JSON.stringify(parsedFormData));
    const choreId = await updateChore({
        id: parsedFormData.id,
        name: parsedFormData.name,
        description: parsedFormData?.description || "",
        taskTypes: parsedFormData?.taskTypes || [],
      }
    );
    return redirect(`/chores/${choreId}`);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message)
      return {error: error.message};
    } else {
      return {error: 'An error occurred'}
    }
  }
}
