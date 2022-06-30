import { createSlice } from "@reduxjs/toolkit";
import { SliceNames } from "~/state/state";
import { GenericReducer } from "~/types/react";

export interface ExampleSlice {
  something: string;
  somethingNested: {
    somethingElse: string;
  };
}

type Reducer<T = void> = GenericReducer<ExampleSlice, T>;

const initialState: ExampleSlice = {
  something: "",
  somethingNested: {
    somethingElse: ""
  }
};

const clean: Reducer = () => initialState;

const setSomething: Reducer<string> = (drafState, { payload }) => {
  drafState.something = payload;
};

const setSomethingElse: Reducer<string> = (drafState, { payload }) => {
  drafState.somethingNested.somethingElse = payload;
};

export const exampleSlice = createSlice({
  name: SliceNames.Example,
  initialState,
  reducers: {
    clean,
    setSomething,
    setSomethingElse
  }
});
