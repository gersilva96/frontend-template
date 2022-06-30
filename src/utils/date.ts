import { differenceInCalendarDays, isAfter, isBefore } from "date-fns";

export const dateIsBefore = (date: Date, comparand: Date): boolean =>
  isBefore(date, comparand);

export const dateIsBeforeToday = (date: Date): boolean =>
  dateIsBefore(date, new Date());

export const dateIsAfter = (date: Date, comparand: Date): boolean =>
  isAfter(date, comparand);

export const dateIsAfterToday = (date: Date): boolean =>
  dateIsAfter(date, new Date());

export const getDaysDiff = (dateLeft: Date, dateRight: Date): number =>
  differenceInCalendarDays(dateRight, dateLeft);

export const getDaysFromDateToToday = (date: Date): number =>
  getDaysDiff(date, new Date());

export const getDaysFromTodayToDate = (date: Date): number =>
  getDaysDiff(new Date(), date);
