import React from "react";
import {
  addHours,
  differenceInDays,
  differenceInMinutes,
  startOfDay,
  subDays,
} from "date-fns";
import { useTimeTableContext } from "./hooks/useTimeTable";
import styled from "styled-components";
import { TimeTableStyles } from "./TimeTable";

export interface TimeTableItem {
  id: string | number;
  name: string;
  info?: string;
  startDate: Date | string;
  endDate: Date | string;
  locationId?: string | number;
  data?: Record<string, unknown>;
  style?: React.CSSProperties;
  className?: string;
}

export interface TimeTableRenderedItem<T> extends Omit<TimeTableItem, "data"> {
  data?: T;
}

const TimeTableItemVerticalContainer = styled.div`
  position: absolute;
  width: 100%;
  font-size: 0.875rem;
  line-height: 1.25rem;
  padding: 0 0.5rem;
`;

const TimeTableItemHorizontalContainer = styled.div`
  position: absolute;
  height: 100%;
  font-size: 0.875rem;
  line-height: 1.25rem;
  padding: 1px 0;
`;

const TimeTableItemInner = styled.div`
  position: relative;
  height: 100%;
  padding: 1px;
`;

const TimeTableItemContent = styled.div<{ $styles: TimeTableStyles }>`
  display: flex;
  position: relative;
  height: 100%;
  color: ${(props) => props.$styles.itemTextColor || "inherit"};
  background-color: ${(props) =>
    props.$styles.itemBackgroundColor || "#304151"};
  cursor: pointer;

  &:hover {
    background-color: ${(props) =>
      props.$styles.itemHoverBackgroundColor ||
      props.$styles.itemBackgroundColor ||
      "#374151"};
  }

  &.ftr-timetable-item__vertical {
    padding: 0.25rem;
    flex-direction: column;

    .ftr-timetable-item__inner {
      top: 62px;
    }
  }

  &.ftr-timetable-item__horizontal {
    padding: 0.125rem 0.25rem;
    flex-direction: row;

    .ftr-timetable-item__inner {
      left: 164px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
  }

  .ftr-timetable-item__inner {
    position: sticky;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 12px;

    .ftr-timetable-item__info {
      font-size: 10px;
      font-weight: normal;
      opacity: 0.9;
    }
  }
`;

const TimeTableItemVertical = React.memo(function ({
  item,
  eventStartOffset,
  eventSize,
  intersections,
  offset,
}: {
  item: TimeTableItem;
  eventStartOffset: number;
  eventSize: number;
  intersections: number;
  offset: number;
}) {
  const { onItemClick, renderItem, styles } = useTimeTableContext();
  return (
    <TimeTableItemVerticalContainer
      title={item.name}
      style={{
        top: `${eventStartOffset}px`,
        height: `${eventSize}px`,
        left: `calc(100% / ${intersections + 1} * ${offset})`,
        maxWidth: `calc(100% / ${intersections + 1})`,
      }}
    >
      <TimeTableItemInner onClick={() => onItemClick?.(item)}>
        {renderItem ? (
          renderItem(item)
        ) : (
          <TimeTableItemContent
            $styles={styles}
            className="ftr-timetable-item ftr-timetable-item__vertical"
            style={item.style}
          >
            <div className="ftr-timetable-item__inner">
              <div>{item.name}</div>
              {item.info && (
                <div className="ftr-timetable-item__info">{item.info}</div>
              )}
            </div>
          </TimeTableItemContent>
        )}
      </TimeTableItemInner>
    </TimeTableItemVerticalContainer>
  );
});

const TimeTableItemHorizontal = React.memo(function ({
  item,
  eventStartOffset,
  eventSize,
  intersections,
  offset,
}: {
  item: TimeTableItem;
  eventStartOffset: number;
  eventSize: number;
  intersections: number;
  offset: number;
}) {
  const { onItemClick, renderItem, styles } = useTimeTableContext();
  return (
    <TimeTableItemHorizontalContainer
      title={item.name}
      style={{
        left: `${eventStartOffset}px`,
        width: `${eventSize}px`,
        top: `calc(100% / ${intersections + 1} * ${offset})`,
        maxHeight: `calc(100% / ${intersections + 1})`,
      }}
    >
      <TimeTableItemInner onClick={() => onItemClick?.(item)}>
        {renderItem ? (
          renderItem(item)
        ) : (
          <TimeTableItemContent
            $styles={styles}
            className="ftr-timetable-item ftr-timetable-item__horizontal"
            style={item.style}
          >
            <div className="ftr-timetable-item__inner">
              <div>{item.name}</div>
              {item.info && (
                <div className="ftr-timetable-item__info">{item.info}</div>
              )}
            </div>
          </TimeTableItemContent>
        )}
      </TimeTableItemInner>
    </TimeTableItemHorizontalContainer>
  );
});

export const TimeTableItem = React.memo(function ({
  item,
  intersections,
  offset,
}: {
  item: TimeTableItem;
  intersections: number;
  offset: number;
}) {
  const { startingHour, numberOfHours, selectedDate, displayStyle } =
    useTimeTableContext();

  const diffDays = differenceInDays(
    new Date(item.startDate),
    new Date(selectedDate)
  );
  const dayStart = subDays(
    addHours(startOfDay(new Date(item.startDate)), startingHour),
    diffDays
  );
  const eventStartOffset = differenceInMinutes(
    new Date(item.startDate),
    dayStart
  );
  const durationMinutes = differenceInMinutes(
    new Date(item.endDate),
    new Date(item.startDate)
  );
  const eventSize = Math.min(
    durationMinutes,
    numberOfHours * 60 - eventStartOffset
  );

  if (displayStyle === "vertical") {
    return (
      <TimeTableItemVertical
        item={item}
        intersections={intersections}
        offset={offset}
        eventStartOffset={eventStartOffset}
        eventSize={eventSize}
      />
    );
  }

  return (
    <TimeTableItemHorizontal
      item={item}
      intersections={intersections}
      offset={offset}
      eventStartOffset={eventStartOffset}
      eventSize={eventSize}
    />
  );
});
