import { Event } from "~/state/store";
import { exampleSlice } from "./slice";

const { actions } = exampleSlice;

export const onSomethingChange =
  (something: string): Event =>
  async (dispatch) => {
    dispatch(actions.setSomething(something));
  };
