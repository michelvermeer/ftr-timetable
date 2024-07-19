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
  &::-webkit-scrollbar {
    width: 0px;
    height: 8px;
    background: #1f2937;
  }

  &::-webkit-scrollbar-thumb {
    background: #555;
    border-radius: 50%;
    border: solid 2px #1f2937;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: hsl(from #888 h s calc(l - 5));
  }

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
  color: ${(props) => props.$styles.dateTextColor || "inherit"};
  background: ${(props) => props.$styles.backgroundColor || "#1f2937"};

  .ftr-timetable-datetime {
    display: flex;
    flex-direction: row;
    position: sticky;
    top: 0;
    z-index: 3;
    background: ${(props) => props.$styles.dateBackgroundColor || "#1f2937"};
    width: 100%;
    height: 44px;

    &__date {
      position: sticky;
      top: 0;
      left: 0;
      z-index: 2;
      background: ${(props) =>
        props.$styles.datePickerBackgroundColor ||
        props.$styles.dateBackgroundColor ||
        "#1f2937"};
      display: flex;
      justify-content: space-between;
      width: 10rem;
      height: 100%;
      flex-shrink: 0;
      flex-direction: row;
    }

    &__select {
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 100%;
      height: 100%;
      padding-left: 0.5rem;
      border-right: ${(props) =>
        props.$styles.borderStyle || "solid 2px #374151"};
      border-bottom: ${(props) =>
        props.$styles.borderStyle || "solid 2px #374151"};

      select {
        background: transparent
          url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='${(
            props
          ) =>
            props.$styles.dateTextColor?.replace("#", "%23") ||
            "%23fff"}'><polygon points='0,0 100,0 50,50'/></svg>")
          no-repeat calc(100% - 10px) calc(50% + 3px);
        background-size: 10px;
        color: inherit;
        font-family: inherit;
        border: none;
        outline: none;
        font-size: 0.875rem;
        line-height: 1.25rem;
        width: 100%;
        -webkit-appearance: none;
        appearance: none;
      }
    }

    &__hours {
      display: flex;
      flex-direction: row;
      position: relative;
      border-bottom: ${(props) =>
        props.$styles.borderStyle || "solid 2px #374151"};
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
  // background-color: ${(props) => props.$styles.backgroundColor || "#1f2937"};
  height: 60px;

  .ftr-timetable-location {
    height: 100%;
    width: 10rem;
    z-index: 2;
    position: sticky;
    top: 0;
    left: 0;
    color: ${(props) => props.$styles.locationTextColor || "inherit"};
    background: ${(props) => props.$styles.locationBackgroundColor || "#000"};

    &__inner {
      display: flex;
      align-items: center;
      height: 100%;
      padding: 0 0.5rem;
      font-size: 0.875rem;
      line-height: 1.25rem;
      border-right: ${(props) =>
        props.$styles.borderStyle || "solid 2px #374151"};
      border-bottom: ${(props) =>
        props.$styles.borderStyle || "solid 2px #374151"};
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
    border-bottom: ${(props) =>
      props.$styles.borderStyle || "solid 2px #374151"};
    // background-color: ${(props) =>
      props.$styles.backgroundColor || "#1f2937"};
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
  const { ref, dateFormat, styles } = useTimeTableContext();
  return (
    <TimeTableContainer
      ref={ref}
      data-testid="timetable-horizontal"
      className="ftr-timetable ftr-timetable__horizontal"
      style={{ height: `${locations.length * 60 + 52}px` }}
    >
      <TimeTableInner
        $styles={styles}
        style={{ minWidth: `${hours.length * 60 + 160}px` }}
      >
        <div className="ftr-timetable-datetime">
          <div className="ftr-timetable-datetime__date">
            <div className="ftr-timetable-datetime__select">
              <select
                value={selectedDate}
                onChange={(e) => dateChange(e.target.value)}
              >
                {dates.map((dt) => {
                  return (
                    <option key={dt} value={dt}>
                      {format(new Date(dt), dateFormat)}
                    </option>
                  );
                })}
              </select>
            </div>
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
