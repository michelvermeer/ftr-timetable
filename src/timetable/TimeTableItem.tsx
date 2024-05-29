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
}: {
  item: TimeTableItem;
  eventStartOffset: number;
  eventSize: number;
}) {
  const { onItemClick, renderItem } = useTimeTableContext();
  return (
    <div
      className="px-1 text-sm w-full absolute"
      title={item.name}
      style={{ top: `${eventStartOffset}px`, height: `${eventSize}px` }}
    >
      <div className="relative h-full" onClick={() => onItemClick?.(item)}>
        {renderItem ? (
          renderItem(item)
        ) : (
          <div className="bg-white hover:bg-slate-200 text-slate-500 cursor-pointer ftr-timetable__item flex flex-col relative h-full p-1">
            <div className="sticky text-[12px] top-[50px] text-ellipsis overflow-hidden">
              <div>{item.name}</div>
              <div>{format(new Date(item.startDate), "dd MMM")}</div>
              <div>
                {format(new Date(item.startDate), "HH:mm")} -{" "}
                {format(new Date(item.endDate), "HH:mm")}
              </div>
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
}: {
  item: TimeTableItem;
  eventStartOffset: number;
  eventSize: number;
}) {
  const { onItemClick, renderItem } = useTimeTableContext();
  return (
    <div
      className="py-1 text-sm h-full absolute"
      title={item.name}
      style={{ left: `${eventStartOffset}px`, width: `${eventSize}px` }}
    >
      <div className="relative h-full" onClick={() => onItemClick?.(item)}>
        {renderItem ? (
          renderItem(item)
        ) : (
          <div className="bg-white hover:bg-slate-200 ftr-timetable__item cursor-pointer text-slate-500 flex relative h-full p-1">
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
}: {
  item: TimeTableItem;
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
        eventStartOffset={eventStartOffset}
        eventSize={eventSize}
      />
    );
  }

  return (
    <TimeTableItemHorizontal
      item={item}
      eventStartOffset={eventStartOffset}
      eventSize={eventSize}
    />
  );
});
