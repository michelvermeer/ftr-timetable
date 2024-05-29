import React from "react";
import { format } from "date-fns";
import clsx from "clsx";
import { type TimeTableLocation, TimeTableView } from "./TimeTable";
import styled from "styled-components";
import { TimeTableMarker } from "./TimeTableMarker";
import { TimeTableItem } from "./TimeTableItem";
import { useTimeTableContext } from "./hooks/useTimeTable";

const TimeTableContainer = styled.div`
  ::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

const TimeTableLocation = React.memo(function ({
  location,
}: {
  location: TimeTableLocation;
}) {
  const { items } = useTimeTableContext();
  const itemsForLocation = items.filter(
    (item) => item.locationId === location.id
  );

  return (
    <div className="flex flex-1 flex-col border-r-2 border-r-slate-700">
      <div
        data-testid={`timetable-location-${location.id}`}
        className="sticky bg-slate-900 px-2 flex h-12 items-center top-0 z-[2] border-b-2 border-b-slate-700"
      >
        {location.name}
      </div>
      <div className="bg-slate-800 flex-1 relative">
        {itemsForLocation.map((item, j) => (
          <TimeTableItem item={item} key={`tt_${item.id}_${j}`} />
        ))}
      </div>
    </div>
  );
});

export const TimeTableVertical: React.FC<TimeTableView> = ({
  dateChange,
  locations,
  dates,
  hours,
  selectedDate,
}) => {
  const { ref } = useTimeTableContext();
  return (
    <TimeTableContainer
      ref={ref}
      data-testid="timetable-vertical"
      className="ftr-timetable ftr-timetable-vertical w-full max-w-[100vw] h-full relative overflow-auto"
    >
      <div className="absolute w-full h-full left-0 top-0 -translate-y-[1px]">
        <div
          className="flex flex-row w-full"
          style={{ minWidth: `${locations.length * 200}px` }}
        >
          <div className="w-32 border-r-2 border-r-slate-700 bg-slate-900 sticky left-0 top-0 z-[3]">
            <div className="sticky bg-slate-900 px-1 h-12 flex justify-end items-center top-0 z-[2] border-b-2 border-b-slate-700">
              <select
                value={selectedDate}
                onChange={(e) => dateChange(e.target.value)}
                className="bg-transparent !border-none !outline-none text-sm"
              >
                {dates.map((dt) => {
                  return (
                    <option key={dt} value={dt}>
                      {format(new Date(dt), "eee dd MMMM")}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="relative z-[1]">
              {hours.map((hour, i) => {
                return (
                  <div
                    key={`hour_${i}`}
                    className={clsx(
                      "h-[60px] flex justify-end text-xs pr-2 relative z-[2] pt-1",
                      i > 0 && "border-t border-t-slate-700"
                    )}
                  >
                    {hour.display}
                  </div>
                );
              })}
              <TimeTableMarker date={selectedDate} />
            </div>
          </div>
          <div className="flex flex-row flex-1 relative">
            {locations.map((location, i) => (
              <TimeTableLocation location={location} key={`location_${i}`} />
            ))}
          </div>
        </div>
      </div>
    </TimeTableContainer>
  );
};
