import {Form} from "react-router";

export const TaskTypeCreateCard = () => {
  return (
    <Form method="post">
      TaskType Name: <input type="text" name="task-type-name"/><br/>
      BoopSize Name: <input type="text" name="boop-size-name"/><br/>
      Tag Names: <input type="text" name="tag-names"/><br/>
      <button type="submit">Submit</button>
    </Form>
  );
}