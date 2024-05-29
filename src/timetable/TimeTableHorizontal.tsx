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
  position: relative;
  overflow: auto;
  width: 100%;
  max-height: 100%;
  max-width: 100vw;
`;

const TimeTableInner = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
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
    <div className="flex border-b-2 border-b-slate-700">
      <div
        data-testid={`timetable-location-${location.id}`}
        className="w-40 sticky bg-black z-[2] px-2 py-4 top-0 left-0 border-r-2 border-r-slate-700"
      >
        {location.name}
      </div>
      <div className="bg-slate-800 flex-1 relative">
        {itemsForLocation.map((item, i) => {
          return <TimeTableItem item={item} key={`tt_${item.id}_${i}`} />;
        })}
      </div>
    </div>
  );
});

export const TimeTableHorizontal: React.FC<TimeTableView> = ({
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
      data-testid="timetable-horizontal"
      className="ftr-timetable ftr-timetable-horizontal"
      style={{ height: `${locations.length * 58 + 50}px` }}
    >
      <TimeTableInner style={{ minWidth: `${hours.length * 60 + 160}px` }}>
        <div className="flex sticky top-0 z-[3] border-b-2 border-b-slate-700 w-full">
          <div className="w-40 shrink-0 sticky bg-slate-900 z-[2] px-1 h-12 flex flex-col justify-center top-0 left-0 border-r-2 border-r-slate-700">
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
          <div className="bg-slate-900 flex flex-row w-full relative">
            {hours.map((hour, i) => {
              return (
                <div
                  className={clsx(
                    "w-[60px] flex items-end text-xs pl-1 pb-1",
                    i > 0 && "border-l border-l-slate-700"
                  )}
                  key={`hour_${i}`}
                >
                  {hour.display}
                </div>
              );
            })}
            <TimeTableMarker date={selectedDate} />
          </div>
        </div>
        {locations.map((location, i) => (
          <TimeTableLocation location={location} key={`location_${i}`} />
        ))}
      </TimeTableInner>
    </TimeTableContainer>
  );
};
