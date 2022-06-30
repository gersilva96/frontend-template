import { configureStore, Slice } from "@reduxjs/toolkit";
import { get } from "lodash-es";
import { useDispatch } from "react-redux";
import { BaseEvent } from "~/types/react";
import { reducers } from "./reducers";

export const store = configureStore({
  reducer: reducers
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export type Event<R = void> = BaseEvent<R, RootState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();

const baseSliceSelector =
  <S, R>(slice: Slice<S>) =>
  (state: R): S =>
    get(state, slice.name);

export const sliceSelector = <S>(
  slice: Slice<S>
): ((rootState: RootState) => S) => baseSliceSelector<S, RootState>(slice);
