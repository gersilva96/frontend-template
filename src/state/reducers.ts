import { exampleSlice } from "./features/example/slice";
import { SliceNames } from "./state";

export const reducers = {
  [SliceNames.Example]: exampleSlice.reducer
};
