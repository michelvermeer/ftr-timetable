import {
  addHours,
  differenceInMinutes,
  format,
  startOfDay,
  subHours,
} from "date-fns";
import React, { useEffect, useMemo } from "react";
import { useTimeTableContext } from "./hooks/useTimeTable";
import styled from "styled-components";

const TimeTableMarkerContainer = styled.div`
  position: absolute;
  background-color: #9f5cf1;
`;

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
    <TimeTableMarkerContainer
      style={{
        width: displayStyle === "horizontal" ? "2px" : "80%",
        height: displayStyle === "horizontal" ? "33.333333%" : "2px",
        left: displayStyle === "horizontal" ? `${position}px` : 0,
        top: displayStyle === "horizontal" ? 0 : `${position}px`,
        // [displayStyle === "horizontal" ? "left" : "top"]: `${position}px`,
      }}
    />
  );
});
