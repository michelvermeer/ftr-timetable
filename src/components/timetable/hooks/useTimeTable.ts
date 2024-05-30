import { useContext } from "react";
import { TimeTableContext } from "../TimeTableProvider";

export const useTimeTableContext = () => {
  const context = useContext(TimeTableContext);
  if (context === undefined) {
    throw new Error(
      "useTimeTableContext must be used within the context of TimeTableContext"
    );
  }
  return context;
};
