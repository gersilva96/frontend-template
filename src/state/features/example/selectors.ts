import { createSelector } from "@reduxjs/toolkit";
import { RootState, sliceSelector } from "~/state/store";
import { exampleSlice } from "./slice";

const slice = sliceSelector(exampleSlice);

export const somethingSelector = (state: RootState): string =>
  slice(state).something;

const somethingNestedSelector = (state: RootState): { somethingElse: string } =>
  slice(state).somethingNested;

export const somethingElseSelector = createSelector(
  somethingNestedSelector,
  (somethingNested) => somethingNested.somethingElse
);
