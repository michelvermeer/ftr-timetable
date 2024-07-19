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
  box-shadow: -1px -1px 2px 0 rgba(0, 0, 0, 0.2);
`;

export const TimeTableMarker = React.memo(function ({
  date,
}: {
  date: string;
}) {
  const { ref, displayStyle, showTimeMarker, startingHour, styles } =
    useTimeTableContext();
  const position = useMemo<number>(() => {
    const dateString = format(new Date(date), "yyyy-MM-dd");
    const nowString = format(subHours(new Date(), startingHour), "yyyy-MM-dd");
    if (dateString !== nowString) {
      return -1;
    }
    const start = addHours(startOfDay(new Date(date)), startingHour);
    const now = new Date();
    const diff = differenceInMinutes(now, start);

    return Math.max(diff, 0);
  }, [date, startingHour]);

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

  if (position < 1 || !showTimeMarker) {
    return null;
  }

  return (
    <TimeTableMarkerContainer
      style={{
        backgroundColor: styles.timeMarkerColor || "#666",
        width: displayStyle === "horizontal" ? "2px" : "80%",
        height: displayStyle === "horizontal" ? "33.333333%" : "2px",
        left: displayStyle === "horizontal" ? `${position}px` : 0,
        top: displayStyle === "horizontal" ? 0 : `${position}px`,
      }}
    />
  );
});
