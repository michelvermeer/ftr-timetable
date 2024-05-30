import clsx from "clsx";
import {
  addHours,
  differenceInMinutes,
  format,
  startOfDay,
  subHours,
} from "date-fns";
import React, { useEffect, useMemo } from "react";
import { useTimeTableContext } from "./hooks/useTimeTable";

export const TimeTableMarker = React.memo(function ({
  date,
}: {
  date: string;
}) {
  const { ref, displayStyle } = useTimeTableContext();
  const position = useMemo<number>(() => {
    const dateString = format(new Date(date), "yyyy-MM-dd");
    const nowString = format(subHours(new Date(), 6), "yyyy-MM-dd");
    if (dateString !== nowString) {
      return -1;
    }
    const start = addHours(startOfDay(new Date(date)), 6);
    const now = new Date();
    const diff = differenceInMinutes(now, start);

    return Math.max(diff, 0);
  }, [date]);

  useEffect(() => {
    if (typeof document === "undefined" || !ref.current) {
      return;
    }

    const scrollTo = Math.max(position - 180, 0);

    ref.current.scrollTo?.({
      top: displayStyle === "vertical" ? scrollTo : 0,
      left: displayStyle === "horizontal" ? scrollTo : 0,
      behavior: "smooth",
    });
  }, [position, displayStyle, ref]);

  if (position < 1) {
    return null;
  }

  return (
    <div
      className={clsx(
        "absolute bg-purple-700",
        displayStyle === "horizontal"
          ? "h-1/3 top-0 w-[2px]"
          : "w-4/5 left-0 h-[2px]"
      )}
      style={{
        [displayStyle === "horizontal" ? "left" : "top"]: `${position}px`,
      }}
    ></div>
  );
});
