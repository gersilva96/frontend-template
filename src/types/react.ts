import React, { ReactElement as _ReactElement } from "react";
import {
  Action,
  CaseReducer,
  PayloadAction,
  ThunkAction
} from "@reduxjs/toolkit";
import { AppError } from "./request";

export type Children = React.ReactNode;
export type ReactElement = _ReactElement;
export type PropsWithChildren<P> = P & { children?: Children };
export type FC<P = unknown> = (props: P) => ReactElement | null;
export type FCC<P = unknown> = FC<PropsWithChildren<P>>;

export type BaseEvent<R = void, S = null> = ThunkAction<
  Promise<R>, // return Type of event dispatch
  S, // slice state type
  void, // extraArgument type (always void)
  Action<string> // event action type (always Action<string>)
>;
export type GenericReducer<S = unknown, T = void> = CaseReducer<
  S,
  PayloadAction<T>
>;

export interface ListDownload<T> {
  downloading: boolean;
  entries: T[];
  error?: AppError;
}

export interface ObjectDownload<T> {
  downloading: boolean;
  error?: AppError;
  value?: T;
}
