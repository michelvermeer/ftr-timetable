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

  height: 100%;
  max-width: 100vw;
  position: relative;
  overflow: auto;
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
  transform: translateY(-1px);
  color: ${(props) => props.$styles.textColor || "#fff"};

  .ftr-timetable-datetime {
    display: flex;
    flex-direction: row;
    width: 100%;

    &__container {
      width: 8rem;
      color: ${(props) => props.$styles.dateTextColor || "inherit"};
      background: ${(props) => props.$styles.dateBackgroundColor || "#1f2937"};
      position: sticky;
      left: 0;
      top: 0;
      z-index: 3;
    }

    &__date {
      width: 100%;
      height: 60px;
      background: ${(props) =>
        props.$styles.datePickerBackgroundColor ||
        props.$styles.dateBackgroundColor ||
        "#1f2937"};
      position: sticky;
      top: 0;
      z-index: 2;
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
        width: 100%;
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
        -webkit-appearance: none;
        appearance: none;
      }
    }

    &__hours {
      position: relative;
      z-index: 1;
      border-right: ${(props) =>
        props.$styles.borderStyle || "solid 2px #374151"};
    }

    &__hour {
      display: flex;
      justify-content: flex-end;
      height: 60px;
      padding-top: 0.25rem;
      padding-right: 0.5rem;
      position: relative;
      z-index: 2;
      font-size: 0.75rem;
      line-height: 1rem;

      &:not(:first-child) {
        border-top: ${(props) =>
          props.$styles.borderStyle || "solid 2px #374151"};
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

const TimeTableLocationContainer = styled.div<{ $styles: TimeTableStyles }>`
  display: flex;
  flex: 1;
  flex-direction: column;

  .ftr-timetable-location {
    height: 60px;
    position: sticky;
    top: 0;
    z-index: 2;
    color: ${(props) => props.$styles.locationTextColor || "inherit"};
    background: ${(props) => props.$styles.locationBackgroundColor || "#000"};

    &__inner {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 0 0.5rem;
      font-size: 0.875rem;
      line-height: 1.25rem;
      height: 100%;
      border-right: ${(props) =>
        props.$styles.borderStyle || "solid 2px #374151"};
      border-bottom: ${(props) =>
        props.$styles.borderStyle || "solid 2px #374151"};
    }

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
    background: ${(props) => props.$styles.backgroundColor || "#1f2937"};
    border-right: ${(props) =>
      props.$styles.borderStyle || "solid 2px #374151"};
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
        className="ftr-timetable-location ftr-timetable-location__vertical"
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
  const { ref, dateFormat, styles } = useTimeTableContext();
  return (
    <TimeTableContainer
      ref={ref}
      data-testid="timetable-vertical"
      className="ftr-timetable ftr-timetable-vertical"
    >
      <TimeTableInner $styles={styles}>
        <div
          className="ftr-timetable-datetime"
          style={{ minWidth: `${locations.length * 200}px` }}
        >
          <div className="ftr-timetable-datetime__container">
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
