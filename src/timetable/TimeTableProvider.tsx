import React, { createContext, createRef } from "react";
import { TimeTable } from "./TimeTable";

export interface TimeTableContext {
  onItemClick?: TimeTable["onItemClick"];
  renderItem?: TimeTable["renderItem"];
  items: TimeTable["items"];
  startingHour: number;
  numberOfHours: number;
  displayStyle: TimeTable["variant"];
  selectedDate: string;
  ref: React.RefObject<HTMLDivElement>;
}

export const TimeTableContext = createContext<TimeTableContext | undefined>(
  undefined
);

export const TimeTableProvider: React.FC<
  React.PropsWithChildren<Omit<TimeTableContext, "ref">>
> = ({ children, ...props }) => {
  return (
    <TimeTableContext.Provider value={{ ...props, ref: createRef() }}>
      {children}
    </TimeTableContext.Provider>
  );
};
