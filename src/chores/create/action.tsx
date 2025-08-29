import {redirect,} from "react-router";
import type {ActionFunctionArgs,} from "react-router-dom"
import {parseChoreForm, addChore} from "@/chores/service";


export const action = async ({
                               request,
                             }: ActionFunctionArgs): Promise<Response | { error: string }> => {
  try {
    const formData = await request.formData()
    const parsedFormData = parseChoreForm(formData);
    const choreId = await addChore({
        name: parsedFormData.choreName,
        description: parsedFormData?.choreDescription,
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
