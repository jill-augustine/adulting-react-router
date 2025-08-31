import {redirect,} from "react-router";
import type {ActionFunctionArgs,} from "react-router-dom"
import {parseCreateChoreForm, addChore} from "@/chores/service";


export const action = async ({
                               request,
                             }: ActionFunctionArgs): Promise<Response | { error: string }> => {
  try {
    const formData = await request.formData()
    const parsedFormData = parseCreateChoreForm(formData);
    const choreId = await addChore({
        name: parsedFormData.name,
        description: parsedFormData?.description || "",
      }
    );
    return redirect(`/chores/${choreId}`);
  } catch (error) {
    if (error instanceof Error) {
      return {error: error.message};
    } else {
      return {error: 'An error occurred'}
    }
  }
}
