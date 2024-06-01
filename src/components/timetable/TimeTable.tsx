import React, { useCallback, useEffect, useMemo, useState } from "react";
import { TimeTableProvider } from "./TimeTableProvider";
import { TimeTableHorizontal } from "./TimeTableHorizontal";
import { TimeTableVertical } from "./TimeTableVertical";
import { TimeTableItem, TimeTableRenderedItem } from "./TimeTableItem";
import { useItemsInRange } from "./hooks/useItemsInRange";
import { useTimetableDates } from "./hooks/useTimetableDates";
import { useItems } from "./hooks/useItems";

export interface TimeTableStyles {
  backgroundColor?: string;
  borderStyle?: string;
  dateBackgroundColor?: string;
  itemBackgroundColor?: string;
  itemHoverBackgroundColor?: string;
  itemTextColor?: string;
  locationBackgroundColor?: string;
  locationTextColor?: string;
  textColor?: string;
}

export interface TimeTable {
  locations: TimeTableLocation[];
  items?: TimeTableItem[];
  variant?: "horizontal" | "vertical";
  startingHour?: number;
  dates?: string[];
  numberOfHours?: number;
  styles?: TimeTableStyles;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onItemClick?: (item: TimeTableRenderedItem<any>) => void;
  onLocationClick?: (location: TimeTableLocation) => void;
  onDateChange?: (date: string) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renderItem?: (item: TimeTableRenderedItem<any>) => React.ReactNode;
  renderLocation?: (location: TimeTableLocation) => React.ReactNode;
}

export interface TimeTableLocation {
  id: string | number;
  name: string;
  items?: TimeTableItem[];
}

export interface TimeTableView {
  dateChange: (date: string) => void;
  locations: TimeTableLocation[];
  dates: string[];
  hours: TimeTableHour[];
  selectedDate: string;
}

interface TimeTableHour {
  hour: number;
  display: string;
}

export const TimeTable: React.FC<TimeTable> = ({
  locations,
  items: individualItems,
  dates,
  onItemClick,
  onLocationClick,
  onDateChange,
  variant,
  renderItem,
  renderLocation,
  startingHour = 6,
  numberOfHours = 24,
  styles: customStyles,
}) => {
  const styles = useMemo<TimeTableStyles>(() => {
    const styles: TimeTableStyles = {
      backgroundColor: "#1f2937",
      dateBackgroundColor: "#1f2937",
      textColor: "#fff",
      borderStyle: "solid 2px #374151",
      ...customStyles,
    };

    return styles;
  }, [customStyles]);

  const [selectedDate, setSelectedDate] = useState<string>();
  const items = useItems(locations, individualItems);
  const itemsInRange = useItemsInRange(
    items,
    startingHour,
    numberOfHours,
    selectedDate
  );
  const timetableDates = useTimetableDates(items, dates);

  const displayStyle: TimeTable["variant"] = useMemo(() => {
    if (variant) {
      return variant;
    }
    return locations.length > 1 ? "horizontal" : "vertical";
  }, [variant, locations]);

  const hours = useMemo<TimeTableHour[]>(() => {
    const hrs: TimeTableHour[] = [];
    for (let i = startingHour; i < startingHour + numberOfHours; i++) {
      const h = i < 24 ? i : i - 24;
      hrs.push({
        hour: i,
        display: `${h < 10 ? "0" : ""}${h}:00`,
      });
    }
    return hrs;
  }, [numberOfHours, startingHour]);

  useEffect(() => {
    setSelectedDate((curr) => curr || timetableDates[0]);
  }, [timetableDates]);

  useEffect(() => {
    selectedDate && onDateChange?.(selectedDate);
  }, [onDateChange, selectedDate]);

  const dateChange = useCallback((selected: string) => {
    setSelectedDate(selected);
  }, []);

  if (!selectedDate) {
    return <></>;
  }

  return (
    <TimeTableProvider
      startingHour={startingHour}
      numberOfHours={numberOfHours}
      onItemClick={onItemClick}
      onLocationClick={onLocationClick}
      displayStyle={displayStyle}
      renderItem={renderItem}
      renderLocation={renderLocation}
      selectedDate={selectedDate}
      items={itemsInRange}
      styles={styles}
    >
      {displayStyle === "horizontal" ? (
        <TimeTableHorizontal
          dateChange={dateChange}
          hours={hours}
          locations={locations}
          dates={timetableDates}
          selectedDate={selectedDate}
        />
      ) : (
        <TimeTableVertical
          dateChange={dateChange}
          hours={hours}
          locations={locations}
          dates={timetableDates}
          selectedDate={selectedDate}
        />
      )}
    </TimeTableProvider>
  );
};
