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

export interface TimeTableItem {
  id: string | number;
  name: string;
  startDate: Date | string;
  endDate: Date | string;
  locationId?: string | number;
  data?: Record<string, unknown>;
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

  .ftr-timetable-item {
    display: flex;
    position: relative;
    height: 100%;
    color: #fff;
    background-color: #304151;
    cursor: pointer;

    &:hover {
      background-color: #374151;
    }

    &__vertical {
      padding: 0.25rem;
      flex-direction: column;

      .ftr-timetable-item__inner {
        top: 62px;
      }
    }

    &__horizontal {
      padding: 0.125rem 0.25rem;
      flex-direction: row;

      .ftr-timetable-item__inner {
        left: 164px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
    }

    &__inner {
      position: sticky;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 12px;
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
  const { onItemClick, renderItem } = useTimeTableContext();
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
          <div className="ftr-timetable-item ftr-timetable-item__vertical">
            <div className="ftr-timetable-item__inner">
              <div>{item.name}</div>
            </div>
          </div>
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
  const { onItemClick, renderItem } = useTimeTableContext();
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
          <div className="ftr-timetable-item ftr-timetable-item__horizontal">
            <div className="ftr-timetable-item__inner">{item.name}</div>
          </div>
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
