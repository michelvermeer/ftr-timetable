import React from "react";
import { format } from "date-fns";
import {
  type TimeTableLocation,
  TimeTableView,
  TimeTableStyles,
} from "./TimeTable";
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
  position: relative;
  overflow: auto;
  width: 100%;
  max-height: 100%;
  max-width: 100vw;
  box-sizing: border-box !important;

  * {
    box-sizing: border-box !important;
  }
`;

const TimeTableInner = styled.div<{ $styles: TimeTableStyles }>`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  color: ${(props) => props.$styles.textColor || "#fff"};

  .ftr-timetable-datetime {
    display: flex;
    flex-direction: row;
    position: sticky;
    top: 0;
    z-index: 3;
    background-color: ${(props) =>
      props.$styles.dateBackgroundColor || "#1f2937"};
    border-bottom: ${(props) =>
      props.$styles.borderStyle || "solid 2px #374151"};
    width: 100%;
    height: 44px;

    &__date {
      position: sticky;
      top: 0;
      left: 0;
      z-index: 2;
      background-color: ${(props) =>
        props.$styles.dateBackgroundColor || "#1f2937"};
      border-right: ${(props) =>
        props.$styles.borderStyle || "solid 2px #374151"};
      display: flex;
      justify-content: space-between;
      width: 10rem;
      height: 100%;
      flex-shrink: 0;
      flex-direction: row;
      padding: 0 0.25rem;

      select {
        background-color: transparent;
        color: ${(props) => props.$styles.textColor || "#fff"};
        border: none;
        outline: none;
        font-size: 0.875rem;
        line-height: 1.25rem;
        width: 100%;
      }
    }

    &__hours {
      display: flex;
      flex-direction: row;
      position: relative;
      background-color: ${(props) =>
        props.$styles.dateBackgroundColor || "#1f2937"};
      width: 100%;
      height: 100%;
    }

    &__hour {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      width: 60px;
      padding-left: 0.25rem;
      padding-bottom: 0.25rem;
      font-size: 0.75rem;
      height: 100%;

      &:not(:first-child) {
        border-left: ${(props) =>
          props.$styles.borderStyle || "solid 2px #374151"};
      }
    }
  }
`;

const TimeTableLocationContainer = styled.div<{ $styles: TimeTableStyles }>`
  display: flex;
  flex-direction: row;
  border-bottom: ${(props) => props.$styles.borderStyle || "solid 2px #374151"};
  background-color: ${(props) => props.$styles.backgroundColor || "#1f2937"};
  height: 60px;

  .ftr-timetable-location {
    height: 100%;
    width: 10rem;
    z-index: 2;
    position: sticky;
    top: 0;
    left: 0;
    color: ${(props) => props.$styles.locationTextColor || "inherit"};
    background-color: ${(props) =>
      props.$styles.locationBackgroundColor || "#000"};
    border-right: ${(props) =>
      props.$styles.borderStyle || "solid 2px #374151"};

    &__inner {
      display: flex;
      align-items: center;
      height: 100%;
      padding: 0 0.5rem;
      font-size: 0.875rem;
      line-height: 1.25rem;
    }

    &__name {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
  }

  .ftr-timetable-location-items {
    flex: 1;
    position: relative;
    height: 100%;
    background-color: ${(props) => props.$styles.backgroundColor || "#1f2937"};
  }
`;

const TimeTableLocation = React.memo(function ({
  location,
}: {
  location: TimeTableLocation;
}) {
  const { items, onLocationClick, renderLocation, styles } =
    useTimeTableContext();
  const itemsForLocation = items.filter(
    (item) => item.locationId === location.id
  );

  const itemWithIntersection = useItemIntersections(itemsForLocation);

  return (
    <TimeTableLocationContainer $styles={styles}>
      <div
        className="ftr-timetable-location ftr-timetable-location__horizontal"
        data-testid={`timetable-location-${location.id}`}
        title={location.name}
        onClick={() => onLocationClick?.(location)}
        style={location.style}
      >
        {renderLocation ? (
          renderLocation(location)
        ) : (
          <div className="ftr-timetable-location__inner">
            <div className="ftr-timetable-location__name">{location.name}</div>
          </div>
        )}
      </div>

      <div className="ftr-timetable-location-items">
        {itemWithIntersection.map((item, i) => {
          return (
            <TimeTableItem
              item={item.item}
              intersections={item.intersections}
              offset={item.offset}
              key={`tt_${item.item.id}_${i}`}
            />
          );
        })}
      </div>
    </TimeTableLocationContainer>
  );
});

export const TimeTableHorizontal: React.FC<TimeTableView> = ({
  dateChange,
  locations,
  dates,
  hours,
  selectedDate,
}) => {
  const { ref, styles } = useTimeTableContext();
  return (
    <TimeTableContainer
      ref={ref}
      data-testid="timetable-horizontal"
      className="ftr-timetable ftr-timetable__horizontal"
      style={{ height: `${locations.length * 60 + 50}px` }}
    >
      <TimeTableInner
        $styles={styles}
        style={{ minWidth: `${hours.length * 60 + 160}px` }}
      >
        <div className="ftr-timetable-datetime">
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
                <div className="ftr-timetable-datetime__hour" key={`hour_${i}`}>
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
