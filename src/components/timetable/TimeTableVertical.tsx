import React from "react";
import { format } from "date-fns";
import { type TimeTableLocation, TimeTableView } from "./TimeTable";
import styled from "styled-components";
import { TimeTableMarker } from "./TimeTableMarker";
import { TimeTableItem } from "./TimeTableItem";
import { useTimeTableContext } from "./hooks/useTimeTable";
import { useItemIntersections } from "./hooks/useItemIntersections";

const TimeTableContainer = styled.div`
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  height: 100%;
  max-width: 100vw;
  position: relative;
  overflow: auto;
  box-sizing: border-box !important;

  * {
    box-sizing: border-box !important;
  }
`;

const TimeTableInner = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  transform: translateY(-1px);

  .ftr-timetable-datetime {
    display: flex;
    flex-direction: row;
    width: 100%;

    &__container {
      width: 8rem;
      border-right: 2px solid #374151;
      background-color: #1f2937;
      position: sticky;
      left: 0;
      top: 0;
      z-index: 3;
    }

    &__date {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
      width: 100%;
      height: 60px;
      padding: 0 0.25rem;
      background-color: #1f2937;
      border-bottom: 2px solid #374151;
      position: sticky;
      top: 0;
      z-index: 2;

      select {
        background-color: transparent;
        color: #fff;
        border: none;
        outline: none;
        font-size: 0.875rem;
        line-height: 1.25rem;
      }
    }

    &__hours {
      position: relative;
      z-index: 1;
    }

    &__hour {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      height: 60px;
      padding-top: 0.25rem;
      padding-right: 0.5rem;
      position: relative;
      z-index: 2;
      font-size: 0.75rem;
      line-height: 1rem;

      &:not(:first-child) {
        border-top: 2px solid #374151;
      }
    }
  }

  .ftr-timetable-locations {
    display: flex;
    flex-direction: row;
    flex: 1;
    position: relative;
  }
`;

const TimeTableLocationContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  border-right: 2px solid #374151;

  .ftr-timetable-location {
    background-color: #000;
    border-bottom: 2px solid #374151;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 0.5rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    position: sticky;
    top: 0;
    z-index: 2;
    height: 60px;

    &__name {
      width: 100%;
      text-overflow: ellipsis;
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
  }

  .ftr-timetable-location-items {
    display: flex;
    flex: 1;
    flex-direction: column;
    position: relative;
    background-color: #1f2937;
  }
`;

const TimeTableLocation = React.memo(function ({
  location,
}: {
  location: TimeTableLocation;
}) {
  const { items, onLocationClick } = useTimeTableContext();
  const itemsForLocation = items.filter(
    (item) => item.locationId === location.id
  );

  const itemWithIntersection = useItemIntersections(itemsForLocation);

  return (
    <TimeTableLocationContainer>
      <div
        data-testid={`timetable-location-${location.id}`}
        title={location.name}
        className="ftr-timetable-location ftr-timetable-location__vertical"
        onClick={() => onLocationClick?.(location)}
      >
        <div className="ftr-timetable-location__name">{location.name}</div>
      </div>
      <div className="ftr-timetable-location-items">
        {itemWithIntersection.map((item, j) => (
          <TimeTableItem
            item={item.item}
            intersections={item.intersections}
            offset={item.offset}
            key={`tt_${item.item.id}_${j}`}
          />
        ))}
      </div>
    </TimeTableLocationContainer>
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
      className="ftr-timetable ftr-timetable-vertical"
    >
      <TimeTableInner>
        <div
          className="ftr-timetable-datetime"
          style={{ minWidth: `${locations.length * 200}px` }}
        >
          <div className="ftr-timetable-datetime__container">
            <div className="ftr-timetable-datetime__date">
              <select
                value={selectedDate}
                onChange={(e) => dateChange(e.target.value)}
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
            <div className="ftr-timetable-datetime__hours">
              {hours.map((hour, i) => {
                return (
                  <div
                    key={`hour_${i}`}
                    className="ftr-timetable-datetime__hour"
                  >
                    {hour.display}
                  </div>
                );
              })}
              <TimeTableMarker date={selectedDate} />
            </div>
          </div>
          <div className="ftr-timetable-locations">
            {locations.map((location, i) => (
              <TimeTableLocation location={location} key={`location_${i}`} />
            ))}
          </div>
        </div>
      </TimeTableInner>
    </TimeTableContainer>
  );
};
