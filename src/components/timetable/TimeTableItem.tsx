import React from "react";
import {
  addHours,
  differenceInDays,
  differenceInMinutes,
  format,
  startOfDay,
  subDays,
} from "date-fns";
import { useTimeTableContext } from "./hooks/useTimeTable";

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
    <div
      className="px-1 text-sm w-full absolute"
      title={item.name}
      style={{
        top: `${eventStartOffset}px`,
        height: `${eventSize}px`,
        left: `calc(100% / ${intersections + 1} * ${offset})`,
        maxWidth: `calc(100% / ${intersections + 1})`,
      }}
    >
      <div className="relative h-full" onClick={() => onItemClick?.(item)}>
        {renderItem ? (
          renderItem(item)
        ) : (
          <div className="bg-slate-400 hover:bg-slate-300 text-slate-800 cursor-pointer ftr-timetable__item flex flex-col relative h-full p-1">
            <div className="sticky text-[12px] top-[62px] text-ellipsis overflow-hidden">
              <div>{item.name}</div>
            </div>
          </div>
        )}
      </div>
    </div>
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
    <div
      className="py-[1px] text-sm h-full absolute"
      title={item.name}
      style={{
        left: `${eventStartOffset}px`,
        width: `${eventSize}px`,
        top: `calc(100% / ${intersections + 1} * ${offset})`,
        maxHeight: `calc(100% / ${intersections + 1})`,
      }}
    >
      <div className="relative h-full" onClick={() => onItemClick?.(item)}>
        {renderItem ? (
          renderItem(item)
        ) : (
          <div className="bg-slate-400 hover:bg-slate-300 ftr-timetable__item cursor-pointer text-slate-800 flex relative h-full px-1 py-0.5">
            <div className="sticky text-[12px] left-[164px] line-clamp-2 text-ellipsis overflow-hidden">
              {item.name}
            </div>
          </div>
        )}
      </div>
    </div>
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
